import { ref } from "vue";

interface FileUploadSelectEvent {
  files: File[];
}

export const useFileUpload = () => {
  const selectedFile = ref<File | null>(null);
  const filePreview = ref<string | null>(null);

  const onFileSelect = (event: FileUploadSelectEvent) => {
    const file = event.files[0];
    if (!file) return;

    selectedFile.value = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      filePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const resetUpload = () => {
    selectedFile.value = null;
    filePreview.value = null;
  };

  return { selectedFile, filePreview, onFileSelect, resetUpload };
};
