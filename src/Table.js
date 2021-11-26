import React, { useState } from "react";
import "@coreui/coreui/dist/css/coreui.css";
import { CDataTable, CCard } from "@coreui/react";
import usersData from "./usersData";

const Table = () => {
  const [startDate, setStartDate] = useState(1326240000000);
  const [endDate, setEndDate] = useState(1330300800000);

  const filteredDateItems = usersData.filter(item => {
    return item.registered >= startDate && item.registered <= endDate;
  });

  return (
    <CCard className="p-5">
      <CDataTable
        items={filteredDateItems}
        fields={[
          "username",
          { key: "registered", _style: { minWidth: "400px" } },
          "role",
          "status"
        ]}
        columnFilter
        tableFilter={{ label: "Table filter:", placeholder: "type..." }}
        sorter
        sorterValue={{ column: "registered", asc: true }}
        hover
        pagination
        scopedSlots={{
          registered: ({ registered }) => {
            return <td>{new Date(Number(registered)).toLocaleDateString()}</td>;
          }
        }}
        columnFilterSlot={{
          registered: (
            <>
              From:{" "}
              <input
                type="date"
                value={new Date(startDate).toISOString().substr(0, 10)}
                onChange={e => setStartDate(new Date(e.target.value).getTime())}
                className="mr-2"
              />
              To:{" "}
              <input
                type="date"
                value={new Date(endDate).toISOString().substr(0, 10)}
                onChange={e => setEndDate(new Date(e.target.value).getTime())}
              />
            </>
          )
        }}
        columnHeaderSlot={{
          registered: <i>Custom Registered Header</i>
        }}
      />
    </CCard>
  );
};

export default Table;
