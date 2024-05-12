"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
interface ClassificationResult {
  predicted_class_name: string;
}
export default function ClassifyAction({ image_data }: any) {
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const handleAnalyze = () => {
    const formData = new FormData();
    const binaryData = atob(image_data.split(",")[1]);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: "image/jpeg" }); // Sesuaikan tipe berkas sesuai kebutuhan
    formData.append("img", blob, "image.jpg");

    fetch("http://127.0.0.1:8080/classify", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      })
      .catch((error) => console.error(error));
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          onClick={handleAnalyze}
          className="rounded-xl w-full mt-4"
        >
          Klasifikasi Gambar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Hasil Klasifikasi :
          </AlertDialogTitle>
          <AlertDialogDescription>
            Berdasarkan gambar MRI yang telah di unggah. Gambar MRI tersebut
            diklasifikasikan sebagai kelas alzheimer{" "}
            {result ? (
              <b className="text-white italic">{result.predicted_class_name}</b>
            ) : (
              <b className="text-white italic">None</b>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="text-white">OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
