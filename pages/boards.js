import React, { Component } from "react";
import axios from "axios";
import Default from "@/components/layouts/Default";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import Dialogs from "@/components/layouts/Dialog";
import Process from "@/components/layouts/reusable/Progress";
import Selects from "@/components/Selects";

class Boards extends Component {
  state = {
    // server: "http://localhost:4007/v1",
    server: "http://matchchemical.ddns.net:4008/v1",
    // server: "http://home420.trueddns.com:57527/v1",
    versionList: [],
    data: [],
    b_id: "",
    b_name: "",
    version: "",
    toggle: false,
  };

  getData() {
    axios.get(`${this.state.server}/getBoards`).then((res) => {
      this.setState({ data: res.data });
    });
  }

  getVersionData() {
    axios.get(`${this.state.server}/getFileData`).then((res) => {
      res.data.map((i) => {
        this.state.versionList.push(i.version);
      });
    });
  }
  componentDidMount() {
    this.getData();
    this.getVersionData();
    console.log(this.state.versionList.length);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.edit) {
      axios
        .patch(`${this.state.server}/updateVersion/${this.state.b_id}`, {
          version: this.state.version,
        })
        .then((res) => {
          if (res.data.message) {
            alert(res.data.message);
          }
          this.getData();
          this.handleToggle();
        });
    } else {
      axios
        .post(`${this.state.server}/addBoard`, {
          b_id: this.state.id,
          b_name: this.state.name,
          version: this.state.version,
        })
        .then((res) => {
          if (res.data.message) {
            alert(res.data.message);
          }
          this.getData();
          this.handleToggle();
        });
    }

    console.log(this.state);
  };

  handleToggle = (id, name, version, edit, b_id) => {
    if (this.state.edit == true) {
      this.setState({ edit: false });
    }
    this.setState({
      toggle: !this.state.toggle,
      id: id,
      name: name,
      version: version,
      edit: edit,
      b_id: b_id,
    });

    console.log(this.state);
  };

  diologs = () => {
    return (
      <Dialogs
        key={1}
        title={"BOARD FORM"}
        handleToggle={this.handleToggle}
        handleChange={this.handleChange}
        handleFileChange={this.handleFileChange}
        handleSubmit={this.handleSubmit}
        data={this.state.data}
        state={this.state}
        error={this.state.data.map((i) => {
          if (this.state.version == i.version) {
            return (
              <div
                className="alert alert-danger d-flex align-items-center mt-2"
                role="alert"
              >
                <div>BOARD USE THIS VERSION</div>
              </div>
            );
          }
        })}
      >
        <div className="box-form">
          <form onSubmit={this.handleSubmit} id="Form">
            <div className="mb-3">
              <label className="form-label" htmlFor="id">
                ID :
              </label>
              <input
                className="form-control"
                name="id"
                value={this.state.id}
                type="text"
                placeholder="EX. M538H256T211124L"
                onChange={this.handleChange}
                disabled={this.state.edit}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                NAME :
              </label>
              <input
                className="form-control"
                name="name"
                value={this.state.name}
                type="text"
                onChange={this.handleChange}
                disabled={this.state.edit}
              ></input>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                VERSION :
              </label>
              <Selects
                key={1}
                version={this.state.version}
                versions={this.state.versionList}
                handleChange={this.handleChange}
              />
            </div>

            <input
              type="submit"
              style={{ width: "100%" }}
              className="btn btn-outline-success mb-3"
            ></input>
          </form>
        </div>
      </Dialogs>
    );
  };

  render() {
    return (
      <Default>
        <div className="container">
          <div className="header">
            <p>BOARDS MANAGER</p>
            {this.state.toggle ? (
              <RemoveIcon
                className="button"
                color="warning"
                onClick={() => {
                  this.handleToggle();
                }}
              />
            ) : (
              <AddCircleIcon
                className="button"
                color="primary"
                onClick={() => {
                  this.handleToggle();
                }}
              />
            )}
          </div>
          <div className="body">
            {this.state.toggle && this.diologs()}

            <div className="box-table">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>TIME</th>
                    <th>SENSOR</th>
                    <th>DATA</th>
                    <th>VERSION</th>
                    <th>EDIT</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map((board, row) => {
                    let tmpData = "";
                    let sensorTmp = "";
                    let valueTemp = "";
                    let value = "";

                    if (board.data != "" && board.data != null) {
                      tmpData = board.data.split("|");
                      sensorTmp = tmpData[0].split("-");
                      valueTemp = tmpData[1].split(":");
                      valueTemp.map((i) => {
                        value += `${i} \n`;
                      });
                    }

                    return (
                      <tr key={board.b_id}>
                        <td>{row + 1}</td>
                        <td>{board.b_id}</td>
                        <td>{board.name}</td>
                        <td>{board.time}</td>
                        <td>{sensorTmp != "" && sensorTmp[1]}</td>
                        <td>{value}</td>
                        <td>{board.version}</td>
                        <td>
                          <button
                            className="btn btn-outline-warning"
                            onClick={() => {
                              this.handleToggle(
                                board.b_id,
                                board.name,
                                board.version,
                                true,
                                board.id
                              );
                            }}
                          >
                            EDIT
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Default>
    );
  }
}

export default Boards;
