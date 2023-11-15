import { Button, MenuItem, TextField } from "@mui/material";
import React from "react";
import Header from "../../Shared/Header";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";

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

const UpdateData = () => {
  const chocolat = useLoaderData();
  const navigate = useNavigate();
  const handleUpdateData = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const imgUrl = form.imgUrl.value;
    const country = form.country.value;
    const category = form.category.value;
    const UpdatedChocolate = { name, imgUrl, country, category };

    fetch(`http://localhost:5300/chocolats/${chocolat._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UpdatedChocolate),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: `You'r data is Updated`,
            icon: "success",
            confirmButtonText: "Cool",
          });
          navigate("/");
        }
      });
  };
  return (
    <div>
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

          <form onSubmit={handleUpdateData} className="flex flex-col gap-3">
            <TextField
              className="bg-white"
              id="outlined-basic"
              label="Image URL"
              name="imgUrl"
              required
              defaultValue={chocolat.imgUrl}
              variant="outlined"
            />
            <TextField
              required
              className="bg-white"
              id="outlined-basic"
              label="name"
              name="name"
              defaultValue={chocolat.name}
              variant="outlined"
            />
            <TextField
              required
              className="bg-white"
              id="outlined-basic"
              label="country"
              name="country"
              defaultValue={chocolat.country}
              variant="outlined"
            />
            <TextField
              required
              className="bg-white"
              id="outlined-select-currency"
              select
              label="Category"
              name="category"
              defaultValue={
                (chocolat && `${chocolat.categorie}`) || "Milk vary"
              }
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

export default UpdateData;
