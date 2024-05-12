"use client";
import Image from "next/image";
import { Upload } from "lucide-react";
import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ClassifyAction from "./ClassifyAction";
export default function BodyCard() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="overflow-hidden rounded-3xl">
      <CardHeader className="flex justify-center items-center">
        <CardTitle>Alzheimer Classification</CardTitle>
        <CardDescription>
          Upload your images below to classify it, you can check example images
          &nbsp;
          <a href="#" target="_blank" className="underline text-blue-400">
            here.
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Label
            htmlFor="picture"
            className={`flex aspect-square hover:cursor-pointer w-full items-center justify-center rounded-xl border ${
              selectedImage ? "border-white" : "border-dashed"
            } `}
          >
            {selectedImage ? (
              <Image
                alt="Product image"
                className="aspect-square w-full rounded-md object-cover"
                height="300"
                src={selectedImage}
                width="300"
              />
            ) : (
              <Upload className="h-8 w-8 text-muted-foreground" />
            )}
            <span className="sr-only">
              <input id="picture" type="file" onChange={handleFileChange} />
            </span>
          </Label>
        </div>
        <ClassifyAction image_data={selectedImage} />
      </CardContent>
    </Card>
  );
}
