"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, AlertCircle, Loader2, ImageIcon, GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Sortable image item
function SortableImage({
  url,
  index,
  onRemove,
}: {
  url: string;
  index: number;
  onRemove: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "aspect-square rounded-lg border-2 border-green-500 bg-green-50 relative overflow-hidden group",
        isDragging && "shadow-xl ring-2 ring-primary"
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={`Zdjęcie ${index + 1}`}
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
          (e.target as HTMLImageElement).parentElement!.classList.add("flex", "items-center", "justify-center");
        }}
      />
      {index === 0 && (
        <Badge className="absolute top-2 left-2 text-xs bg-primary">
          Główne
        </Badge>
      )}
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-1 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="h-4 w-4 text-white" />
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="absolute -top-0 -right-0 w-7 h-7 bg-red-500 rounded-bl-lg flex items-center justify-center hover:bg-red-600 transition-colors"
      >
        <X className="h-4 w-4 text-white" />
      </button>
    </div>
  );
}

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
  folder?: string;
  className?: string;
}

export function ImageUpload({
  value,
  onChange,
  maxFiles = 5,
  folder = "events",
  className,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState<number>(0); // number of files being uploaded
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  // DnD sensors — activate after 8px of movement to differentiate from clicks
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = value.indexOf(active.id as string);
      const newIndex = value.indexOf(over.id as string);
      onChange(arrayMove(value, oldIndex, newIndex));
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    // Validate type
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError(`"${file.name}" — nieprawidłowy format. Dozwolone: JPEG, PNG, WebP`);
      return null;
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / 1024 / 1024).toFixed(1);
      setError(`"${file.name}" (${sizeMB}MB) — za duży plik. Max 2MB`);
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Błąd uploadu (${res.status})`);
      }

      const data = await res.json();
      return data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Błąd uploadu");
      return null;
    }
  };

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      setError("");
      const fileArray = Array.from(files);

      // Check max files
      const remaining = maxFiles - value.length;
      if (remaining <= 0) {
        setError(`Osiągnięto limit ${maxFiles} zdjęć`);
        return;
      }

      const filesToUpload = fileArray.slice(0, remaining);
      if (fileArray.length > remaining) {
        setError(`Można dodać jeszcze ${remaining} zdjęć. Pomijam ${fileArray.length - remaining} plików.`);
      }

      setUploading(filesToUpload.length);

      const urls: string[] = [];
      for (const file of filesToUpload) {
        const url = await uploadFile(file);
        if (url) {
          urls.push(url);
        }
      }

      if (urls.length > 0) {
        onChange([...value, ...urls]);
      }

      setUploading(0);
    },
    [value, maxFiles, folder, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      if (e.dataTransfer.files) {
        handleFiles(e.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Preview grid with drag & drop sorting */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={value} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {value.map((url, index) => (
              <SortableImage
                key={url}
                url={url}
                index={index}
                onRemove={() => handleRemove(index)}
              />
            ))}

            {/* Upload slots */}
            {uploading > 0 &&
              Array.from({ length: uploading }).map((_, i) => (
                <div
                  key={`uploading-${i}`}
                  className="aspect-square rounded-lg border-2 border-dashed border-primary bg-primary/5 flex flex-col items-center justify-center"
                >
                  <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
                  <span className="text-xs text-primary">Wysyłanie...</span>
                </div>
              ))}

            {/* Add button */}
            {value.length + uploading < maxFiles && uploading === 0 && (
              <button
                type="button"
                onClick={handleClick}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={cn(
                  "aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center transition-colors cursor-pointer",
                  dragActive
                    ? "border-primary bg-primary/10"
                    : "border-muted-foreground/30 hover:border-primary hover:bg-primary/5"
                )}
              >
                <Upload className="h-8 w-8 text-muted-foreground/50 mb-2" />
                <span className="text-sm text-muted-foreground">Dodaj zdjęcie</span>
                <span className="text-xs text-muted-foreground/70 mt-1">Max 2MB</span>
              </button>
            )}
          </div>
        </SortableContext>
      </DndContext>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) {
            handleFiles(e.target.files);
            e.target.value = ""; // Reset to allow re-selecting same file
          }
        }}
      />

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Info */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <ImageIcon className="h-3.5 w-3.5" />
        <span>
          {value.length}/{maxFiles} zdjęć • JPEG, PNG lub WebP • Max 2MB na zdjęcie
        </span>
      </div>
      {value.length > 1 && (
        <p className="text-xs text-muted-foreground">
          <GripVertical className="h-3 w-3 inline mr-1" />
          Przeciągnij zdjęcia, aby zmienić kolejność. Pierwsze zdjęcie = główne.
        </p>
      )}
    </div>
  );
}
