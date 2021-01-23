import React from "react";
import API from "../../utils/API";

class Table extends React.Component {
  state = {
    employee: [],
    origin: [],
  };

  componentDidMount() {
    this.searchApi();
  }

  searchApi() {
    API.getRandomUsers()
      .then((res) =>
        res.data.results.sort((a, b) => a.name.last.localeCompare(b.name.last))
      )
      .then((res) => this.setState({ employee: res }))
      .then((res) => this.setState({ origin: this.state.employee }));
  }

  filterMethod = (event) => {
    let name = event.target.value.trim().toLowerCase();
    //   console.log(name)
    let filteredArr = this.state.origin.filter(
      (element) =>
        element.name.first.toLowerCase().includes(name) ||
        element.name.last.toLowerCase().includes(name)
    );
    this.setState({ employee: filteredArr });
  };

  render() {
    return (
      <>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Employee's name"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            onChange={this.filterMethod}
          />
          <div class="input-group-append"></div>
        </div>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Picture ID</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employee.map((element) => (
              <tr>
                <th>
                  {" "}
                  <img
                    src={element.picture.thumbnail}
                    alt={element.name.first}
                  />
                </th>
                <td>
                  {element.name.first} {element.name.last}
                </td>
                <td>{element.phone}</td>
                <td>{element.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Table;
