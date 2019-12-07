import React, { useState, useRef } from "react";
import { Button, FormGroup, Label, Input, Spinner } from "reactstrap";
import { updatePicture } from "../Services/ProfileCRUD";

const ImageUpload = ({ url }) => {
  const inputEl = useRef(null);
  const [file, setFile] = useState(null);
  const [newUrl, setNewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const onImageChange = e => {
    const uploadedFile = e.target.files[0];
    const url = URL.createObjectURL(e.target.files[0]);
    setNewUrl(url);
    setFile(uploadedFile);
  };

  const onSave = async () => {
    const formData = new FormData();
    formData.append("profile", file);
    setLoading(true);
    const result = await updatePicture(formData);
    setLoading(false);
  };

  return (
    <FormGroup>
      <Label for="image">Picture</Label>
      <img
        src={newUrl || url}
        alt="profile-form-pic"
        className="rounded-circle form-pic"
      />
      <Label for="btn">Change Picture</Label>
      <Input ref={inputEl} type="file" name="btn" onChange={onImageChange} />
      <Button color="primary" onClick={onSave} style={{ marginTop: "5px" }}>
        {loading ? (
          <Spinner style={{ width: "1.5rem", height: "1.5rem" }} />
        ) : (
          "Upload Image"
        )}
      </Button>
    </FormGroup>
  );
};

export default ImageUpload;
