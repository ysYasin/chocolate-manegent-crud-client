import React, { useState } from "react";
import Header from "../../Shared/Header";
import { Link, useLoaderData } from "react-router-dom";
import { Button } from "@mui/material";
import { FaPen, FaPlusSquare, FaTrashAlt } from "react-icons/fa";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";

const Home = () => {
  const data = useLoaderData();
  const [chocolats, setChocolats] = useState(data);

  const handleDalet = (id) => {
    console.log(id);
    fetch(`http://localhost:5300/chocolats/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged || data.deletedCount > 0) {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            iconHtml: "<img src='/warning.gif' />",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            customClass: {
              icon: "img-alert-style",
            },
          }).then((result) => {
            if (result.isConfirmed) {
              setChocolats([...chocolats].filter((c) => c._id !== id));
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
        }
      });
  };

  return (
    <div className=" pb-28 bg-[#D6D6D6]">
      <div className="bg-white mx-auto p-10 w-[90%] rounded-lg">
        <Header></Header>
        <div className="w-[80%] my-5 mx-auto">
          <Link to="/add-chocolate">
            <Button
              style={{ color: "#000" }}
              className="flex items-center gap-2"
            >
              {" "}
              <FaPlusSquare /> new chocolate{" "}
              <img src="/asset/chocoIcon.png" style={{ height: "50px" }} />
            </Button>
          </Link>
        </div>
        <div className="w-[80%] mx-auto mt-5 mb-10 px-16 pt-5 pb-16 shadow-lg bg-[#14141405] border-2 border-l-slate-200 rounded-lg">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow style={{ background: "#e5d2c2" }}>
                  <TableCell
                    style={{
                      fontWeight: "600",
                      textAlign: "center",
                      fontSize: "20px",
                    }}
                  >
                    Image
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "600",
                      textAlign: "center",
                      fontSize: "20px",
                    }}
                    align="right"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "600",
                      textAlign: "center",
                      fontSize: "20px",
                    }}
                    align="right"
                  >
                    Country/Factory
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "600",
                      textAlign: "center",
                      fontSize: "20px",
                    }}
                    align="right"
                  >
                    Category
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "600",
                      textAlign: "center",
                      fontSize: "20px",
                    }}
                    align="right"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chocolats.map((chocolat) => (
                  <TableRow
                    key={chocolats._Id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="chocolat">
                      <div
                        className="overflow-hidden rounded-sm"
                        style={{ width: "70px" }}
                      >
                        <img
                          src={chocolat.imgUrl}
                          width={"100%"}
                          className="hover:scale-105"
                          alt=""
                        />
                      </div>
                    </TableCell>
                    <TableCell align="left">{chocolat.name}</TableCell>
                    <TableCell align="left">{chocolat.country}</TableCell>
                    <TableCell align="left">{chocolat.category}</TableCell>
                    <TableCell align="left">
                      <div className="flex gap-2">
                        <Link to={`/chocolate-Update/${chocolat._id}`}>
                          <button className="bg-[#E5D2C2] text-[#867669] hover:border-[#E5D2C2]">
                            {" "}
                            <FaPen />{" "}
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDalet(chocolat._id)}
                          className="bg-[#E5D2C2] text-[#867669] hover:border-[#E5D2C2]"
                        >
                          {" "}
                          <FaTrashAlt />{" "}
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
