"use client";

import { useState } from "react";
import InputImage from "@/components/common/InputImage";
import InputText from "@/components/common/InputText";
import TextArea from "@/components/common/TextArea";
import DatePicker from "@/components/common/DatePicker";
import Button from "@/components/common/Button";

const CreateBook = () => {
  const [formData, setFormData] = useState({
    cover: "",
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    publishDate: null as Date | null,
    publisher: "",
    language: "",
    pages: "",
    availableCopies: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pb-6">
      <h1 className="text-xl font-bold py-2">Create Book</h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-1">
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">Cover</h3>
            <InputImage
              onUpload={(file) => {
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    setFormData((prev) => ({
                      ...prev,
                      cover: e.target?.result as string,
                    }));
                  };
                  reader.readAsDataURL(file);
                } else {
                  setFormData((prev) => ({ ...prev, cover: "" }));
                }
              }}
            />
          </div>
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">Title</h3>
            <InputText
              placeholder="e.g. A Song of Ice and Fire"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">Author</h3>
            <InputText
              placeholder="e.g. George R. R. Martin"
              value={formData.author}
              onChange={handleChange}
            />
          </div>
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">Genre</h3>
            <InputText
              placeholder="e.g. Fiction"
              value={formData.genre}
              onChange={handleChange}
            />
          </div>
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">ISBN</h3>
            <InputText
              placeholder="e.g. 9780553386790"
              value={formData.isbn}
              onChange={handleChange}
            />
          </div>
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">Description</h3>
            <TextArea
              placeholder="e.g. A Song of Ice and Fire takes place in a fictional world in which seasons.."
              rows={6}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-span-1">
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">Publish Date</h3>
            <DatePicker
              placeholder="Select date"
              selectedDate={formData.publishDate}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, publishDate: date }))
              }
            />
          </div>
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">Publisher</h3>
            <InputText
              placeholder="e.g. Random House Worlds"
              value={formData.publisher}
              onChange={handleChange}
            />
          </div>
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">Language</h3>
            <InputText
              placeholder="e.g. English"
              value={formData.language}
              onChange={handleChange}
            />
          </div>
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">Pages</h3>
            <InputText
              placeholder="e.g. 704"
              value={formData.pages}
              onChange={handleChange}
            />
          </div>
          <div className="py-1">
            <h3 className="font-semibold text-lg py-2 px-3">
              Available Copies
            </h3>
            <InputText
              placeholder="e.g. 100"
              value={formData.availableCopies}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-span-2 flex justify-end gap-2">
          <Button className="rounded-full" color="opacity10">
            Back
          </Button>
          <Button className="rounded-full" color="rose">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
