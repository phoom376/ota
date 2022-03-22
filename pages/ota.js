import { Component } from "react";
import Default from "@/components/layouts/Default";
import axios from "axios";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import Icon from "@mui/material/Icon";
import Dialogs from "@/components/layouts/Dialog";
import Process from "@/components/layouts/reusable/Progress";

class OTA extends Component {
  state = {
    // server: "https://ota-drive.herokuapp.com",
    // server: "http://localhost:4007",
    // server: "http://home420.trueddns.com:57527",
    server: "http://matchchemical.ddns.net:4008",
    name: "TEST State",
    version: "",
    fileName: "",
    description: "",
    edit: false,
    file: null,
    test: "",
    data: [],
    vCheck: true,
    progress: 0,
    toggle: false,
    size: 0,
  };

  getData() {
    axios.get(`${this.state.server}/v1/getFileData`).then((res) => {
      this.setState({ data: res.data, size: 0 });
      if (res.data.length > 0) {
        res.data.map((i) => {
          this.setState({ size: (this.state.size += i.size) });
        });
      }
      if (res.data.message) {
        alert(res.data.message);
      }

      console.log(this.state.data);
    });
  }

  componentDidMount() {
    this.getData();
  }

  handleToggle = () => {
    this.setState({ toggle: !this.state.toggle });
    console.log(this.state.toggle);
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    // document.getElementById("Form").reset();

    let formData = new FormData();

    formData.append("file", this.state.file);
    formData.append("description", this.state.description);
    formData.append("version", this.state.version);

    let flieupload = this.state.file;
    console.log(flieupload);
    console.log(formData);

    let check = true;

    this.state.data.length > 0 &&
      this.state.data.map((i) => {
        if (this.state.version == i.version) {
          check = false;
        }
      });

    console.log(check);
    if (this.state.version == "" || this.state.file == null) {
      alert("ALL INPUT REQUIRE");
    }
    if (check && this.state.version != "" && this.state.file != null) {
      console.log("OK");
      await axios
        .post(`${this.state.server}/v1/uploadFile`, formData, {
          onUploadProgress: (ProgressEvent) => {
            this.setState({
              progress: parseInt(
                Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
              ),
            });
            console.log(
              "progress : ",
              parseInt(
                Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
              )
            );
          },
        })
        .then((res) => {
          if (res.data.status) {
            setTimeout(() => {
              alert(res.data.message);
              this.setState({ version: "" });
              this.setState({ description: "" });
              document.getElementById("Form").reset();
              this.setState({ progress: 0 });
              this.getData();
              this.handleToggle();
            }, 1000);
          } else {
            alert(res.data.message);
            this.getData();
            this.setState({ process: 0 });
          }
        });
    } else {
      console.log("NO");
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFileChange = (e) => {
    let file = e.target.files[0];
    this.setState({ file: file });

    console.log(e.target.files[0]);
  };

  handleDelete = async (id) => {
    console.log(id);
    await axios
      .delete(`${this.state.server}/v1/deleteFile/${id}`)
      .then((res) => {
        if (res.data.message) {
          this.getData();

          alert("FILE DELETED");
        }
      });
  };

  render() {
    return (
      <Default>
        <div className="container">
          <div className="header">
            <p>
              OTA FILE UPLOAD | TOTAL SIZE:
              {(this.state.size / 1000000).toFixed(2)}mb
            </p>
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
            {this.state.toggle && (
              <Dialogs
                title={"OTA FORM"}
                handleToggle={this.handleToggle}
                handleChange={this.handleChange}
                handleFileChange={this.handleFileChange}
                handleSubmit={this.handleSubmit}
                data={this.state.data}
                state={this.state}
                error={
                  this.state.data.length > 0 &&
                  this.state.data.map((i) => {
                    if (this.state.version == i.version) {
                      return (
                        <div
                          className="alert alert-danger d-flex align-items-center mt-2"
                          role="alert"
                        >
                          <div>THIS VERSION HAS BEEN EXITS</div>
                        </div>
                      );
                    }
                  })
                }
              >
                <div className="box-form">
                  <form onSubmit={this.handleSubmit} id="Form">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="version">
                        Version :
                      </label>
                      <input
                        className="form-control"
                        name="version"
                        type="text"
                        placeholder="ETC. 1.0.0.1"
                        onChange={this.handleChange}
                      ></input>
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="bin">
                        Bin File :
                      </label>
                      <input
                        className="form-control"
                        name="bin"
                        type="file"
                        onChange={(e) => this.handleFileChange(e)}
                      ></input>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="description">
                        Description:
                      </label>
                      <textarea
                        name="description"
                        className="form-control"
                        type="text"
                        onChange={this.handleChange}
                      ></textarea>
                    </div>

                    <input
                      type="submit"
                      className="btn btn-outline-success mb-3"
                      style={{ width: "100%" }}
                    ></input>

                    <Process process={this.state.progress} />
                  </form>
                </div>
              </Dialogs>
            )}

            <div className="box-table">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>NO</th>
                    <th>ID</th>
                    <th>VERSION</th>
                    <th>NAME</th>
                    <th>PATH</th>
                    <th>DESCRIPTION</th>
                    <th>SIZE</th>
                    <th>TIME</th>
                    <th>DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.length > 0 &&
                    this.state.data.map((i, k) => {
                      let DateTime_tmp = i.time.split("T");
                      let time_tmp = DateTime_tmp[1].split(".");
                      return (
                        <tr>
                          <td>{k + 1}</td>
                          <td>{i.id}</td>
                          <td>{i.version}</td>
                          <td>{i.name}</td>
                          <td>{i.path}</td>
                          <td>{i.description}</td>
                          <td>{i.size / 1000} kb</td>
                          <td>
                            {DateTime_tmp[0]} {time_tmp[0]}
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => this.handleDelete(i.id)}
                            >
                              DELETE
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

export default OTA;
