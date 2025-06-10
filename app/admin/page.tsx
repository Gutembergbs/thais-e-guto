import UploadForm from "@/components/upload-form";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6 text-pink-600">
        Thais e Guto - Área Administrativa
      </h1>
      <UploadForm />
    </div>
  );
}
