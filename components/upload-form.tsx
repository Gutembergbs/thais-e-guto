"use client"

import { useState } from "react"

export default function UploadForm() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  async function uploadFile(file: File) {
    setUploading(true)
    setProgress(0)

    try {
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: "POST",
        body: file,
      })

      if (!response.ok) {
        throw new Error("Falha no upload")
      }

      const blob = await response.json()
      setUploadedFiles((prev) => [...prev, blob.url])
      setProgress(100)

      return blob.url
    } catch (error) {
      console.error("Erro no upload:", error)
      return null
    } finally {
      setTimeout(() => {
        setUploading(false)
      }, 1000)
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return

    for (let i = 0; i < files.length; i++) {
      await uploadFile(files[i])
      setProgress(((i + 1) / files.length) * 100)
    }
  }

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload de Arquivos</h2>
      <div className="space-y-4">
        <input 
          type="file" 
          onChange={handleFileChange} 
          disabled={uploading} 
          multiple 
          accept="image/*,video/*"
          className="w-full border p-2 rounded"
        />

        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-pink-600 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Arquivos enviados:</h3>
            <ul className="text-sm space-y-1">
              {uploadedFiles.map((url, i) => (
                <li key={i} className="break-all">
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {url.split("/").pop()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}