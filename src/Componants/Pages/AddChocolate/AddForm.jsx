import React from "react";
import Header from "../../Shared/Header";
import { Button, MenuItem, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa";

const categories = [
  {
    value: "Milk vary",
    label: "Milk vary",
  },
  {
    value: "Catvary",
    label: "Catvary",
  },
  {
    value: "Dark",
    label: "Dark",
  },
  {
    value: "RedVary",
    label: "RedVary",
  },
];

const AddForm = () => {
  const navigate = useNavigate();
  const handleSubmitData = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const imgUrl = form.imgUrl.value;
    const country = form.country.value;
    const category = form.category.value;
    const newChocolate = { name, imgUrl, country, category };
    console.log(newChocolate);

    fetch(`http://localhost:5300/chocolats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newChocolate),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Your product is uploaded successfully",
            iconHtml: '<img src="/success.gif"/>',
            confirmButtonText: "Thats Fine",
            customClass: {
              icon: "img-alert-style",
            },
          });
          form.reset();
        }
      });
  };

  return (
    <div className=" pb-28 bg-[#D6D6D6]">
      <div className="bg-white mx-auto p-10 w-[90%] rounded-lg">
        <Header></Header>
        <div className="w-[50%] my-5 mx-auto">
          <Link to="/">
            <Button
              style={{ color: "#000" }}
              className="flex items-center gap-2"
            >
              {" "}
              <FaArrowLeft /> All Chocolates{" "}
            </Button>
          </Link>
        </div>
        <div className="w-[50%] mx-auto mt-5 mb-10 px-16 pt-5 pb-16 shadow-lg bg-[#14141405] border-2 border-l-slate-200 rounded-lg">
          <div className="text-center pb-10">
            <h3 className="text-2xl font-semibold">New Chocolates</h3>
            <p className="text-slate-500">
              Use the below form to create a new product
            </p>
          </div>

          <form onSubmit={handleSubmitData} className="flex flex-col gap-3">
            <TextField
              className="bg-white"
              id="outlined-basic"
              label="Image URL"
              name="imgUrl"
              required
              variant="outlined"
            />
            <TextField
              required
              className="bg-white"
              id="outlined-basic"
              label="name"
              name="name"
              variant="outlined"
            />
            <TextField
              required
              className="bg-white"
              id="outlined-basic"
              label="country"
              name="country"
              variant="outlined"
            />
            <TextField
              required
              className="bg-white"
              id="outlined-select-currency"
              select
              label="Category"
              name="category"
              defaultValue="Milk vary"
              helperText="Please select your category*"
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button
              className="mt-5"
              type="submit"
              variant="contained"
              disableElevation
            >
              Add chocolate
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
