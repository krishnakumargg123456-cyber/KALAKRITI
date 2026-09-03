"use client";

import * as React from "react";
import { ImagePlus, X } from "lucide-react";

export interface ImageUploadProps {
  value?: string | null;
  onChange: (file: File | null) => void;
  accept?: string;
  disabled?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  accept = "image/*",
  disabled = false,
}: ImageUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] ?? null;
    onChange(file);
  };

  const handleRemove = () => {
    onChange(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        onChange={handleFileChange}
        className="sr-only"
      />

      {value ? (
        <div className="relative overflow-hidden rounded-card border border-border bg-paper">
          <img
            src={value}
            alt="Uploaded preview"
            className="aspect-video w-full object-cover"
          />

          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            aria-label="Remove image"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-deepMaroon text-white shadow-soft transition-transform hover:scale-105 disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className="flex min-h-44 w-full flex-col items-center justify-center rounded-card border-2 border-dashed border-gold/50 bg-paper px-6 py-8 text-center transition-colors hover:border-maroon hover:bg-parchment disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-parchment text-maroon">
            <ImagePlus className="h-6 w-6" />
          </span>

          <span className="font-serif text-base font-semibold text-maroon">
            Upload an image
          </span>

          <span className="mt-1 text-xs text-muted">
            Choose an image from your device
          </span>
        </button>
      )}
    </div>
  );
}
