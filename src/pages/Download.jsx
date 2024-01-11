import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import supabase from "../utilities/supabase";

function Download() {
  const [data, setData] = useState([]);

  useEffect(() => {
    document
      .getElementsByClassName("w-full max-w-[650px] z-30")[0]
      .classList.add("none");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data, error } = await supabase
          .from("downloaded_images")
          .select("*");

        if (error) {
          throw error;
        }

        setData(data);
      } catch (error) {
        console.error("Error fetching data from Supabase:", error.message);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "User ID",
        accessor: "user_id",
      },
      {
        Header: "User Email",
        accessor: "user_email",
      },
      {
        Header: "File ID",
        accessor: "file_id",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const openInNewTab = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="table-container">
      <h2 style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
        Download Image Data
      </h2>
      <div className="table-wrapper">
        <table {...getTableProps()} className="responsive-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} title="Open in new tab" >
                  {row.cells.map((cell, index) => (
                    <td
                      {...cell.getCellProps()}
                      onClick={() => index === 2 && openInNewTab(cell.value)}
                      style={{ cursor: index === 2 ? "pointer" : "default" }}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Download;
