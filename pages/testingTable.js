// import React from "react";
// import ReactDOM from "react-dom";
// import DataGrid from "react-data-grid";
// // import "./styles.css";

// const columns = [
//   { key: "id", name: "ID", editable: true },
//   { key: "title", name: "Title", editable: true },
//   { key: "complete", name: "Complete", editable: true }
// ];

// const rows = [
//   { id: 0, title: "Task 1", complete: 20 },
//   { id: 1, title: "Task 2", complete: 40 },
//   { id: 2, title: "Task 3", complete: 60 }
// ];

// class Example extends React.Component {
//   state = { rows };

//   onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
//     this.setState(state => {
//       const rows = state.rows.slice();
//       for (let i = fromRow; i <= toRow; i++) {
//         rows[i] = { ...rows[i], ...updated };
//       }
//       return { rows };
//     });
//   };
//   render() {
//     return (
//       <DataGrid
//         columns={columns}
//         rowGetter={rows}
//         rowsCount={3}
//         onGridRowsUpdated={this.onGridRowsUpdated}
//         enableCellSelect={true}
//       />
//     );
//   }
// }

// export default Example;



// import React from "react";
// import DataGrid from 'react-data-grid';


// const columns = [
//   { key: 'id', name: 'ID',editable: true },
//   { key: 'title', name: 'Title',editable: true }
// ];

// const rows = [
//   { id: 0, title: 'Example' },
//   { id: 1, title: 'Demo' }
// ];



// function App() {
  

//   const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
//     let state = { rows };
//     state.map(state => {
//       const rows = state.rows.slice();
//       for (let i = fromRow; i <= toRow; i++) {
//         rows[i] = { ...rows[i], ...updated };
//       }
//       return { rows };
//     });
//   };

//   return (
//     <DataGrid
//       columns={columns}
//       rows={rows}
//       onGridRowsUpdated={onGridRowsUpdated}
//       enableCellSelect={true}
//     />
//   );
// }

// export default App;


// import React from "react";
// import ReactDOM from "react-dom";
// import ReactDataGrid from "react-data-grid";
// // import "./styles.css";

// const columns = [
//   { key: "id", name: "ID", editable: true },
//   { key: "title", name: "Title", editable: true },
//   { key: "complete", name: "Complete", editable: true }
// ];

// const rows = [
//   { id: 0, title: "Task 1", complete: 20 },
//   { id: 1, title: "Task 2", complete: 40 },
//   { id: 2, title: "Task 3", complete: 60 }
// ];

// class Example extends React.Component {
//   state = { rows };

//   onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
//     this.setState(state => {
//       const rows = state.rows.slice();
//       for (let i = fromRow; i <= toRow; i++) {
//         rows[i] = { ...rows[i], ...updated };
//       }
//       return { rows };
//     });
//   };
//   render() {
//     return (
//       <ReactDataGrid
//         columns={columns}
//         rowGetter={i => this.state.rows[i]}
//         rowsCount={3}
//         onGridRowsUpdated={this.onGridRowsUpdated}
//         enableCellSelect={true}
//       />
//     );
//   }
// }

// // const rootElement = document.getElementById("root");
// // ReactDOM.render(<Example />, rootElement);
// export default Example;

import React, { useState } from 'react';
import ReactDataGrid from 'react-data-grid';

const columns = [
  { key: 'id', name: 'ID', editable: true },
  { key: 'title', name: 'Title', editable: true },
  { key: 'complete', name: 'Complete', editable: true },
];

const rows = [
  { id: 0, title: 'Task 1', complete: 20 },
  { id: 1, title: 'Task 2', complete: 40 },
  { id: 2, title: 'Task 3', complete: 60 },
];

const grid = () => {
  const [gridState, setGridState] = useState(rows);

  const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    setGridState(gridState => {
      const rows = gridState.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

  return (
    <ReactDataGrid
      columns={columns}
      // rowGetter={i => gridState[i]}
      // rowsCount={3}
      rows={rows}
      onGridRowsUpdated={onGridRowsUpdated}
      enableCellSelect={true}
    />
  );
};

export default grid;

