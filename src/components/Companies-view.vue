<template>
  <div class="container" style="display: flex;">
    <div class="table-container" v-show="tableActive">
      <div class="header" style="display: flex; margin-bottom: 2rem; margin-top: 1rem">
        <h2>List of Companies</h2>

        <div class="dropdown" style="margin-right: 1rem;">
          <b-button class="btn-is-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down"
                 viewBox="0 0 16 16">
              <path
                d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
            </svg>
            Sort
          </b-button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" @click="sortTable(0)">Company</a>
            <a class="dropdown-item" @click="sortTable(1)">Headquarters</a>
            <a class="dropdown-item" @click="sortTable(2)">Contact Person</a>
          </div>
        </div>

        <b-button class="btn-outline-dark" @click="createCompany">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-buildings"
               viewBox="0 0 16 16">
            <path
              d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022ZM6 8.694 1 10.36V15h5V8.694ZM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15Z"/>
            <path
              d="M2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-2 2h1v1H2v-1Zm2 0h1v1H4v-1Zm4-4h1v1H8V9Zm2 0h1v1h-1V9Zm-2 2h1v1H8v-1Zm2 0h1v1h-1v-1Zm2-2h1v1h-1V9Zm0 2h1v1h-1v-1ZM8 7h1v1H8V7Zm2 0h1v1h-1V7Zm2 0h1v1h-1V7ZM8 5h1v1H8V5Zm2 0h1v1h-1V5Zm2 0h1v1h-1V5Zm0-2h1v1h-1V3Z"/>
          </svg>
          Create Company
        </b-button>
      </div>

      <div class="table-container" id="dataTable">
        <table class="table table-hover table-striped" id="companyTable" style="align-content: center">
          <thead>
          <tr>
            <th scope="col">Company Name</th>
            <th scope="col">Headquarters</th>
            <th scope="col">Contact Person</th>
            <th scope="col">Designation</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Email Address</th>
            <th scope="col">Username</th>
            <th scope="col">Password</th>
            <th scope="col" class="has-text-centered">Status</th>
            <th scope="col">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="company in companies">
            <td>{{ company.company_name }}</td>
            <td>{{ company.headquarters }}</td>
            <td>{{ company.name }}</td>
            <td>{{ company.designation }}</td>
            <td>{{ company.contact_no }}</td>
            <td>{{ company.email }}</td>
            <td>{{ company.username }}</td>
            <td>{{ company.password }}</td>
            <td class="has-text-centered" v-if="company.status==='active'">
              <b-tooltip label="Company is Active"
                         position="is-left"
                         type="is-success"
                         :active="active" target="">
                <status-indicator status="positive"></status-indicator>
              </b-tooltip>
            </td>
            <td class="has-text-centered" v-if="company.status==='not-active'">
              <b-tooltip label="Company isn't Active"
                         position="is-left"
                         type="is-danger"
                         :active="active" target="">
                <status-indicator status="negative"></status-indicator>
              </b-tooltip>
            </td>
            <td style="cursor: pointer" @click="edit(company.id)">
              <b-tooltip label="Edit Details"
                         position="is-left"
                         type="is-dark"
                         :active="active" target="">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     class="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                  <path fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
              </b-tooltip>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <CompanyCreate v-show="createCompanyActive" @goToBack="closeCreate"></CompanyCreate>
    <CompanyEdit
      v-show="companyEditActive"
      v-if="editMode"
      @tableCallback="closeEdit"
      :companyData="companyData"
    ></CompanyEdit>
  </div>

</template>

<script>
import CompanyCreate from "./Company-Create.vue";
import CompanyEdit from "./Company-Edit.vue";
import {appSettings} from "../appsettings";
import axios from "axios";


export default {
  name: "Companies-view",
  data() {
    return {
      createCompanyActive: false,
      tableActive: true,
      companyEditActive: false,
      statusActive: false,
      companies: [],
      companyData: '',
      editMode: false,
      active: true,
    }
  },
  components: {CompanyEdit, CompanyCreate},
  methods: {
    createCompany() {
      this.tableActive = false;
      this.createCompanyActive = true;
    },
    closeCreate() {
      this.createCompanyActive = false;
      this.tableActive = true;
      this.loadData();
    },
    edit(id) {
      axios.get(`${appSettings.$api_url}/api/Company/${id}`)
        .then(response => {
          const companyData = response.data.data.company;
          this.$emit('getData', companyData);
          this.companyData = companyData
          this.tableActive = false;
          this.companyEditActive = true;
          // console.log(companyData)
          this.editMode = true;
        })
        .catch(error => {
          console.error(error);
        });
    },


    closeEdit() {
      this.companyEditActive = false;
      this.createCompanyActive = false;
      this.tableActive = true;
      this.editMode = false;
      this.loadData();
    },

    loadData() {
      const comp = this
      comp.$axios.get(appSettings.$api_url + '/api/Company/list')
        .then((response) => {
          if (response.status === 200) {
            comp.companies = response.data.data.companies
            $(document).ready(() => {
              $('#companyTable').DataTable();
            });
          }
        })
    },

    sortTable(n) {
      var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
      table = document.getElementById("companyTable");
      switching = true;
      dir = "asc";
      while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("td")[n];
          y = rows[i + 1].getElementsByTagName("td")[n];
          if (dir === "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          } else if (dir === "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          switchcount++;
        } else {
          if (switchcount === 0 && dir === "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    }
  },


  mounted() {
    this.loadData()
  }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Proza+Libre');

.header h2 {
  margin-right: 37rem;
  font-family: 'Century Gothic';
  font-weight: 700;
  color: #393953;
  font-size: 30px
}

.btn-outline-dark {
  background-color: #1E1E1E;
  color: #FFFFFF;
  border-radius: 45px;
}

.btn-is-light {
  border-radius: 45px;
  background-color: #FFFFFF;
  color: #1E1E1E;
  border-color: #1E1E1E
}

th {
  color: #A7A9AC;
  font-weight: 700;
  font-size: 13px;
}

td {
  font-size: 12px;
  font-family: 'Roboto', sans-serif;

  #dataTable {
    margin-top: 30px;
  }

}

@media screen and (max-width: 340px) {
  .container {
    width: 340px;
    height: 620px;
  }

  .table-container {
    overflow: auto;
  }

  .header {
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 1rem;
  }

  .table-container table {
    font-size: 12px;
  }
}

</style>
