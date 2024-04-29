import React, { useState } from "react";
import { toast } from "react-toastify";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [productImg, setProductImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true)

    // add product to firebase
    try {
      const docRef = await collection(db, "products");
      const storageRef = ref(
        storage,
        `productImages/${Date.now() + productImg.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, productImg);

      uploadTask.on(
        () => {
          toast.error("Image not uploaded");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, {
              productName: title,
              shortDesc,
              description,
              category,
              price,
              imgUrl: downloadURL,
            });
          });
        }
      );
      setLoading(false)
      toast.success("Product succesfully added");
      navigate('/dashboard/all-products')

    } catch (error) {
      setLoading(false)
      toast.error('Product not added')
    }

    
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
           {loading ? <h4 className="py-5">Loading.....</h4> : <>
           <h4 className="mb-5">Add Product</h4>
            <Form onSubmit={addProduct}>
              <FormGroup className="form_group">
                <span>Product title</span>
                <input
                  type="text"
                  placeholder="Double sofa"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup className="form_group">
                <span>Short Description</span>
                <input
                  type="text"
                  placeholder="Lorem"
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup className="form_group">
                <span>Description</span>
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </FormGroup>

              <div className="d-flex align-items-center justify-content-between gap-5">
                <FormGroup className="form_group w-50">
                  <span>Price</span>
                  <input
                    type="number"
                    placeholder="$100"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="form_group w-50">
                  <span>Category</span>
                  <select
                    className="w-100 p-2"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Select Category</option>
                    <option value="chair">Chair</option>
                    <option value="sofa">Sofa</option>
                    <option value="mobile">Mobile</option>
                    <option value="watch">Watch</option>
                    <option value="wireless">Wireless</option>
                  </select>
                </FormGroup>
              </div>
              <div>
                <FormGroup className="form_group">
                  <span>Product Image</span>
                  <input
                    type="file"
                    onChange={(e) => setProductImg(e.target.files[0])}
                    required
                  />
                </FormGroup>
              </div>
              <button type="submit" className="buy_btn">
                Add Product
              </button>
            </Form>
           </>}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProduct;
