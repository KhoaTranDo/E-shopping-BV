import axios from "axios";
import { Component } from "react";

class editproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subfile: [],
      name: "",
      price: "",
      categoryrs: "",
      brandrs: "",
      detail: "",
      status: "",
      sale: "",
      company: "",
      showsale: "hidden",
      error: {},
      image: [],
      imageremove: [],
    };

    this.Handlechange = this.Handlechange.bind(this);
    this.Submitdata = this.Submitdata.bind(this);
  }
  componentDidMount() {
    if (localStorage.data) {
      this.setState({
        brand: [],
        category: [],
      });
    }
    let token = localStorage.token;
    let config = {
      headers: {
        Authorization: "Bearer " + token, // CÓ dấu cách
        Accept: "application/json",
      },
    };
    axios
      .get(
        `http://localhost:8080/laravel/public/api/user/product/${this.props.match.params.slug}`,
        config
      )
      .then((res) => {
        this.setState({
          name: res.data.data.name,
          price: res.data.data.price,
          company: res.data.data.company_profile,
          detail: res.data.data.detail,
          brandrs: res.data.data.id_brand,
          categoryrs: res.data.data.id_category,
          status: res.data.data.status,
          sale: res.data.data.sale,
          image: res.data.data.image,
          id_user: res.data.data.id_user,
        });
      });
    axios
      .get("http://localhost:8080/laravel/public/api/category-brand")
      .then((res) => {
        this.setState({
          brand: res.data.brand,
          category: res.data.category,
        });
      });
  }

  Handlechange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  Handleoption = (e) => {
    if (e.target.id === "status" && e.target.value === "1") {
      this.setState({ [e.target.id]: e.target.value, showsale: "hidden" });
    } else if (e.target.id === "status" && e.target.value === "0") {
      this.setState({ [e.target.id]: e.target.value, showsale: "number" });
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  };
  SelectOption = (datasort) => {
    if (datasort === "brand") {
      let brand = this.state.brand;
      if (brand) {
        return brand.map((value) => {
          return (
            <option id={value["id"]} value={value["id"]}>
              {value["brand"]}
            </option>
          );
        });
      }
    }
    if (datasort === "category") {
      let category = this.state.category;
      if (category) {
        return category.map((value, index) => {
          return (
            <option id={value["id"]} value={value["id"]}>
              {value["category"]}
            </option>
          );
        });
      }
    }
  };
  Submitdata(e) {
    e.preventDefault();
    let {
      name,
      price,
      brandrs,
      categoryrs,
      status,
      sale,
      company,
      file,
      detail,
    } = this.state;
    let check = 0;
    let geterror = {};
    this.setState({
      error: {},
    });
    if (!file) {
      check = 1;
      geterror["file"] = "Vui long chon anh";
    }
    if (!name) {
      check = 1;
      geterror["ten"] = "Vui long nhap ten";
    }
    if (!price) {
      check = 1;
      geterror["price"] = "Vui long nhap gia tien";
    }
    if (!brandrs) {
      check = 1;
      geterror["brand"] = "Vui long chon thuong hieu";
    }
    if (!categoryrs) {
      check = 1;
      geterror["category"] = "Vui long nhap loai hang";
    }
    if (!company) {
      check = 1;
      geterror["company"] = "Vui long nhap cong ty";
    }
    if (!detail) {
      check = 1;
      geterror["detail"] = "Vui long nhap phan mo ta";
    }
    if (status) {
      geterror["status"] = "";
      if (status === "0") {
        if (!sale) {
          check = 1;
          geterror["sale"] = "Vui long nhap gia sale";
        }
      }
    } else {
      check = 1;
      geterror["file"] = "Vui long nhap hinh thuc ban";
    }

    if (check === 0) {
      let currentImg = this.state.image.length;
      let newImg = file.length;
      let remove = this.state.imageremove.length;
      if (
        currentImg - remove + newImg >= 0 &&
        currentImg - remove + newImg <= 3
      ) {
        const formData = new FormData();
        let token = localStorage.token;
        let config = {
          headers: {
            Authorization: "Bearer " + token, // CÓ dấu cách
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        };
        formData.append("category", categoryrs);
        formData.append("brand", brandrs);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("status", status);
        formData.append("detail", detail);
        formData.append("company", company);

        file.map((value) => {
          formData.append("file[]", value);
        });
        this.state.imageremove.map((value) => {
          formData.append("avatarCheckBox[]", value);
        });
        axios
          .post(
            `http://localhost:8080/laravel/public/api/user/edit-product/${this.props.match.params.slug}`,
            formData,
            config
          )
          .then((res) => {
            this.setState({
              name: res.data.data.name,
              price: res.data.data.price,
              company: res.data.data.company_profile,
              detail: res.data.data.detail,
              brandrs: res.data.data.id_brand,
              categoryrs: res.data.data.id_category,
              status: res.data.data.status,
              sale: res.data.data.sale,
              image: JSON.parse(res.data.data.image),
              id_user: res.data.data.id_user,
              imageremove: [],
              isChecked: false,
            });
          })
          .catch((err) => {
            console.log(err.response);
          });
      } else {
        geterror["status"] = "Vuot qua 3 anh";
        this.setState({
          error: geterror,
        });
      }
    } else {
      this.setState({
        error: geterror,
      });
    }
  }
  HandleUserInputFile = (e) => {
    const typeimage = ["jpg", "PNG", "png", "jpeg", "JPG"];
    const file = e.target.files;
    let check = true;
    if (file.length === 1) {
      if (file[0].size < 1024 * 1024) {
        const check1 = file[0].type.split("/");
        if (typeimage.includes(check1[1])) {
          let getimage = [];
          getimage.push(file[0]);
          let reader = new FileReader();
          reader.onload = (e) => {
            this.setState({
              file: getimage,
              error: {},
            });
          };
          reader.readAsDataURL(file[0]);
        } else {
          check = false;
          let geterror = this.state.error;
          geterror["image"] = "File đẩy lên không phải hình ảnh";
          geterror["size"] = "";
          this.setState({
            error: geterror,
          });
        }
      } else {
        check = false;
        let geterror = this.state.error;
        geterror["image"] = "";
        geterror["size"] = "Anh vượt quá 1mb";
        this.setState({
          error: geterror,
        });
      }
    } else {
      let getfile = [];
      if (file.length <= 3) {
        this.setState({
          error: {},
        });
        Object.keys(file).map((value, index) => {
          if (file[value].size <= 1024 * 1024) {
            const check1 = file[value].type.split("/");
            if (typeimage.includes(check1[1])) {
              let reader = new FileReader();
              getfile.push(file[value]);
              reader.onload = (e) => {
                this.setState({
                  //avatar: e.target.result,
                  //file: file[value],
                  error: {},
                });
              };
              reader.onload = (e) => {};
              reader.readAsDataURL(file[value]);
            } else {
              check = false;
              let geterror = this.state.error;
              geterror["image"] = "File tai len khong phai anh";
              geterror["size"] = "";
              this.setState({
                error: geterror,
              });
            }
          } else {
            check = false;
            let geterror = this.state.error;
            geterror["image"] = "";
            geterror["size"] = "Anh vượt quá 1mb";
            this.setState({
              error: geterror,
            });
          }
        });
        this.setState({
          file: getfile,
        });
      } else {
        check = false;
        let geterror = this.state.error;
        geterror["image"] = "";
        geterror["size"] = "";
        geterror["count"] = "Chi được tối da 3 ảnh";
        this.setState({
          error: geterror,
        });
      }
    }
  };
  checkvalue = (e) => {
    if (e.target.checked === true) {
      let { imageremove } = this.state;
      imageremove.push(e.target.value);
      this.setState({
        imageremove: imageremove,
      });
    } else {
      let { imageremove } = this.state;
      imageremove.map((value, index) => {
        if (value === e.target.value) imageremove.splice(index, 1);
      });
      // imageremove.push(e.target.value)
      this.setState({
        imageremove: imageremove,
      });
    }
  };
  renderimage = () => {
    if (this.state.image.length > 0) {
      return (
        <div className="listimage-edit">
          {this.state.image.map((index) => {
            return (
              <div style={{ display: "inline-block" }}>
                <img
                  src={`http://localhost:8080/laravel/public/upload/user/product/${this.state.id_user}/${index}`}
                ></img>
                <input
                  type="checkbox"
                  checked={this.state.imageremove.includes(index)}
                  value={index}
                  onChange={(e) => this.checkvalue(e)}
                ></input>
              </div>
            );
          })}
        </div>
      );
    }
  };
  renderError = () => {
    let Printerror = this.state.error;
    if (Object.keys(Printerror).length > 0) {
      return Object.keys(Printerror).map((value, index) => {
        return (
          <p id="error" style={{ color: "red" }}>
            {Printerror[value]}
          </p>
        );
      });
    }
  };
  //tu dong render khi co state thay doi
  render() {
    return (
      <>
        <div className="signup-form col-sm-8">
          <h2>Edit Product</h2>
          <form action="#">
            <input
              type="text"
              name="name"
              onChange={this.Handlechange}
              value={this.state.name}
              placeholder="Name"
            />
            <input
              type="number"
              name="price"
              onChange={this.Handlechange}
              value={this.state.price}
              placeholder="Price"
            />
            <select
              name="brand"
              id="brandrs"
              value={this.state.brandrs}
              onChange={this.Handleoption}
            >
              <option disabled selected value>
                -- select an option --
              </option>
              {this.SelectOption("brand")}
            </select>
            <select
              name="category"
              id="categoryrs"
              value={this.state.categoryrs}
              onChange={this.Handleoption}
            >
              <option disabled selected value>
                -- select an option --
              </option>
              {this.SelectOption("category")}
            </select>
            <select
              name="status"
              id="status"
              value={this.state.status}
              onChange={this.Handleoption}
            >
              <option disabled selected value>
                -- select an option --
              </option>
              <option value="1">New</option>
              <option value="0">Sale</option>
            </select>
            <input
              type={this.state.showsale}
              name="sale"
              onChange={this.Handlechange}
              value={this.state.sale}
              placeholder="%"
              width="50%"
              hidden="0"
            />
            <input
              type="text"
              name="company"
              onChange={this.Handlechange}
              placeholder="Company Profile"
              value={this.state.company}
            />
            <input
              type="file"
              name="image"
              onChange={this.HandleUserInputFile}
              placeholder={this.state.avatar}
              multiple
            />
            {/* Image choose to delete */}
            {this.renderimage()}
            {/* Set level default =0 */}
            <p id="error" style={{ color: "red" }}></p>
            {this.renderError()}
            <button onClick={this.Submitdata} className="btn btn-default">
              Update
            </button>

            <br />
          </form>
        </div>
      </>
    );
  }
}

export default editproduct;

// - bat loi form:
// + FE tu bat : 15,16
// + BE tu bat: (khi e gui data qua, dung thi tien hanh insert data -> DB)
// => Object, lay loi tu BE neu co, hien thi ra man hinh
