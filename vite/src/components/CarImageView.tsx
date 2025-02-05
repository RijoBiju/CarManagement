import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload } from "lucide-react";

interface CarImageViewProps {
  images: { imageUrl: string; tag: string; fileName: string }[];
  imagesLoading: boolean;
  selectedImageType: string;
  setSelectedImageType: (tag: string) => void;
}

export default function CarImageView({
  images,
  imagesLoading,
  selectedImageType,
  setSelectedImageType,
}: CarImageViewProps) {
  if (!imagesLoading && images.length === 0)
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <Upload className="mx-auto h-12 w-12 mb-4" />
        <p>No images uploaded. Upload to get started</p>
      </div>
    );

  return (
    <>
      <Tabs
        defaultValue="initial"
        className="w-[400px] mb-6"
        value={selectedImageType}
        onValueChange={setSelectedImageType}
      >
        <TabsList>
          <TabsTrigger value="initial">Initial images</TabsTrigger>
          <TabsTrigger value="final">Final Images</TabsTrigger>
        </TabsList>
      </Tabs>

      {imagesLoading ? (
        <div className="text-center py-8">Loading images...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images
            .filter((image) => image.tag === selectedImageType)
            .map((image, index) => (
              <div
                key={index}
                className="relative group border rounded-lg overflow-hidden"
              >
                <img
                  src={image.imageUrl}
                  alt={`Car ${image.tag} view`}
                  className="h-48 w-full object-cover hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>
            ))}
          {!images.filter((image) => image.tag === selectedImageType).length &&
            `No image of the ${selectedImageType} tag uploaded yet`}
        </div>
      )}
    </>
  );
}
