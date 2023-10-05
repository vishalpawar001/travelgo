import React, { useState } from 'react';
import { BASE_URL } from '../../utils/config';
import Header from './Header/Header';
import { imageDB } from '../../utils/firebaseConfig';
import {ref, uploadBytes,getDownloadURL } from 'firebase/storage';
import { Button } from 'reactstrap';

function AdminAdd() {

  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [ct, setCt] = useState(0);
  const [imgUrl , setImgUrl] = useState("");

  const [formData, setFormData] = useState({
    title: '',
    city: '',
    address: '',
    distance: 0,
    photo: null,
    desc: '',
    price: 0,
    maxGroupSize: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload =async()=>{
    setIsUploading(true);
    console.log("clicked",ct);
    const img =ref(imageDB,`files/img${ct}`);
    uploadBytes(img, image)
      .then((snapshot) => {
        setCt(ct + 1);
        getDownloadURL(snapshot.ref).then((url) => {
          setImgUrl(url);
          setIsUploading(false);
          setFormData({
            ...formData,
            photo: imgUrl,
          });
          console.log('Image URL:', url);
        });
      })
      .catch((error) => {
        console.error('Error uploading image to Firebase:', error);
      });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("tick")

    try {
      // Send a POST request to your backend API endpoint
      const res = await fetch(`${BASE_URL}/tours/admin/createTour`, {
        method:'post',
        headers: {
           'content-type':'application/json'
        },
        credentials:'include',
        body: JSON.stringify(formData)
     })

     const result = await res.json();
     if(res.status === 200){
        window.alert("Saved successfully");
        setImgUrl(null);

      }else{
        window.alert("Something went wrong");
      }

      // Clear the form or perform other actions as needed
      // setFormData({
      //   title: '',
      //   city: '',
      //   address: '',
      //   distance: 0,
      //   photo: '',
      //   desc: '',
      //   price: 0,
      //   maxGroupSize: 0,
      // });
    } catch (error) {
      console.error('Error adding data to the database', error);
      // Handle the error, show an error message to the user, etc.
    }
  };

  return (
    <div>
      <Header />
      <h1>Add a New Tour</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Distance:</label>
          <input
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Photo:</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          {/* <input
            type="file"
            name="photo"
            value={formData.photo}
            onChange={handleInputChange}
          /> */}
          {isUploading && <span> uploading...</span>}
          <Button onClick={handleImageUpload}> Upload IMage </Button>
          {/* {imgUrl   && <img  src={imgUrl} alt="Review" />} */}
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="desc"
            value={formData.desc}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Max Group Size:</label>
          <input
            type="number"
            name="maxGroupSize"
            value={formData.maxGroupSize}
            onChange={handleInputChange}
          />
        </div>
        {imgUrl ?  <button type="submit" onClick={handleSubmit} >Add Tour</button> : <button type="submit" disabled="true" onClick={handleSubmit} >Add Tour</button>  }
       
      </form>
    </div>
  );
}

export default AdminAdd;
