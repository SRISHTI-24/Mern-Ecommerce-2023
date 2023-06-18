import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
  const [categories, setcategories] = useState([]);

  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setupdatedName] = useState("");
  //handle form
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/v1/category/create-category`, {
        name,
      });
      if (data.success) {
        alert(`${name} is created`);
        getallcategory();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };
  // get all cate
  const getallcategory = async () => {
    try {
      const { data } = await axios.get(`/api/v1/category/get-category`);
      if (data.success) {
        setcategories(data.category);
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  };

  useEffect(() => {
    getallcategory();
  }, []);

  //update category
  const handleupdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        alert(`${updatedName} is updated`);
        setSelected(null);
        setupdatedName("");
        setVisible(false);
        getallcategory();
      } else {
        alert(data.message);
      }
      console.log(e);
    } catch (error) {
      alert("somehing went wrong");
    }
  };
  //delete category
  const handledelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pid}`,
        { name: updatedName }
      );
      if (data.success) {
        alert(`${name} is deleted`);
        getallcategory();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("somehing went wrong");
    }
  };
  return (
    <Layout title={"Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handlesubmit={handlesubmit}
                value={name}
                setvalue={setName}
              />
            </div>
            <div className="w-75">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn btn-primary ms-2"
                            onClick={() => {
                              setVisible(true);
                              setupdatedName(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handledelete(c._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setvalue={setupdatedName}
                handlesubmit={handleupdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
