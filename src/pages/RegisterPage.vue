<template>
<div class="reg_container">
  <div v-if="this.$session.exists()" class="container">
        <InvalidAccess/>
  </div>
  <div v-else class="main_register_container">
    <div class="left_side_text">
      <a>want to keep track of everything that happens in the Superliga?</a>
      <p>Register.</p>
    </div>
    <div class="frosted_glass_register">
      <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
        <b-form-group class="field_name"
          id="input-group-username"
          label-cols-sm="3"
          label="Username:"
          label-for="username"
        >
          <b-form-input class="input_field"
            id="username"
            v-model="$v.form.username.$model"
            type="text"
            :state="validateState('username')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.username.required">
            Username is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.username.length">
            Username length should be between 3-8 characters long
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.username.alpha">
            user name should be alphabetical only!
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="field_name"
          id="input-group-firstname"
          label-cols-sm="3"
          label="First Name:"
          label-for="firstname"
        >
          <b-form-input class="input_field"
            id="fistname"
            v-model="$v.form.firstname.$model"
            type="text"
            :state="validateState('firstname')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.firstname.required">
            Firstname is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.firstname.length">
            Firstname length should be at most 20 characters long
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.firstname.alpha">
            first name name should be alphabetical only!
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="field_name"
          id="input-group-lastname"
          label-cols-sm="3"
          label="Last Name:"
          label-for="lastname"
        >
          <b-form-input class="input_field"
            id="lastname"
            v-model="$v.form.lastname.$model"
            type="text"
            :state="validateState('lastname')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.lastname.required">
            Lastname is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.lastname.length">
            Lastname length should be at most 20 characters long
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="!$v.form.lastname.alpha">
            last name should be alphabetical only!
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="field_name"
          id="input-group-country"
          label-cols-sm="3"
          label="Country:"
          label-for="country"
        >
          <b-form-select class="input_field"
            id="country"
            v-model="$v.form.country.$model"
            :options="countries"
            :state="validateState('country')"
          ></b-form-select>
          <b-form-invalid-feedback>
            Country is required
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="field_name"
          id="input-group-email"
          label-cols-sm="3"
          label="Email:"
          label-for="email"
        >
          <b-form-input class="input_field"
            id="email"
            v-model="$v.form.email.$model"
            :state="validateState('email')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.email.required">
            Email is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.email.email">
            Not valide Email
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="field_name"
          id="input-group-Password"
          label-cols-sm="3"
          label="Password:"
          label-for="password"
        >
          <b-form-input class="input_field"
            id="password"
            type="password"
            v-model="$v.form.password.$model"
            :state="validateState('password')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.password.required">
            Password is required
          </b-form-invalid-feedback>
          <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
            Your password should be <strong>strong</strong>. <br />
            For that, your password should be also:
          </b-form-text>
          <b-form-invalid-feedback
            v-if="$v.form.password.required && !$v.form.password.length">
            Have length between 5-10 characters long
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-if="$v.form.password.required && !$v.form.password.numberOrletter">
            Have at least 1 number and 1 letter
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="field_name"
          id="input-group-confirmedPassword"
          label-cols-sm="3"
          label="Confirm Password:"
          label-for="confirmedPassword"
        >
          <b-form-input class="input_field"
            id="confirmedPassword"
            type="password"
            v-model="$v.form.confirmedPassword.$model"
            :state="validateState('confirmedPassword')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
            Password confirmation is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback
            v-else-if="!$v.form.confirmedPassword.sameAsPassword"
          >
            The confirmed password is not equal to the original password
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="field_name"
          id="input-group-photo_url"
          label-cols-sm="3"
          label="Photo:"
          label-for="photo_url"
        >
        <b-form-input class="input_field"
            id="photo_url"
            v-model="$v.form.photo_url.$model"
            :state="validateState('photo_url')"
          ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.photo_url.required">
            Path is required
          </b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form.photo_url.url">
            Path is not valide
          </b-form-invalid-feedback>
        </b-form-group>
        <div class="buttons">
        <b-button type="reset" variant="danger">Reset</b-button>
        <b-button 
          type="submit"
          variant="dark"
          style="width:150px;"
          >Register</b-button
        >
        </div>
        <div class="mt-2">
          You have an account already?
          <router-link to="login"> Log in here</router-link>
        </div>
      </b-form>

    </div>
  </div>
</div>
</template>

<script>
import InvalidAccess from "../components/InvalidAccess.vue"
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
  url
} from "vuelidate/lib/validators";
const numberOrletter = (p) => /\d/.test(p) && /[a-z]/i.test(p)

export default {
  name: "Register",
  components:{
    InvalidAccess
  },
  data() {
    return {
      form: {
        username: "",
        firstname: "",
        lastname: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        photo_url: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      firstname: {
        required,
        length: (f) => maxLength(20)(f),
        alpha
      },
      lastname: {
        required,
        length: (l) => maxLength(20)(l),
        alpha
      },
      country: {
        required
      },
       email: {
        required,
        email
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        numberOrletter
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      photo_url:{
        required,
        url
      }
    }
  },
  mounted() {
    this.countries.push(...countries);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },

    async Register() {
      try {
        const response = await this.$root.server.post(
          `Register`,
          {
            username: this.form.username,
            password: this.form.password,
            first_name: this.form.firstname,
            last_name: this.form.lastname, 
            country: this.form.country,
            email: this.form.email,
            photo_url: this.form.photo_url
          }
        );
        this.$root.toast("Successfully Registered", `${this.form.username} successfully registered `, "success");
        this.$router.push("/login");
      } catch (err) {
        this.form.submitError = err.response.data;
        this.form.submitError = err.response.data;
        this.$root.toast("Error Register", err.response.data, "danger");
      }
    },
    onRegister() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstname: "",
        lastname: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        photo_url: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>

.frosted_glass_register *{
  margin-inline: auto;
  text-align: center;
}

.frosted_glass_register {
    width:max-content;
    height: max-content;
    margin-right: 5%;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2); 
    border-radius: 5px;
    position: relative;
    z-index: 1;
    background: inherit;
    padding-block: 5px;
    margin-top: 10px;
    margin-bottom: 50px;
}

.frosted_glass_register:before {
    content: "";
    position: absolute;
    background: inherit;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, .5);
    filter: blur(10px);
    backdrop-filter: blur(10px);
}

.reg_container{
  width: 100%;
  height: 100%;
   backdrop-filter: blur(5px);
  overflow: scroll;
}

.main_register_container{
  display: flex;
  justify-content: space-between;
}

.input_field{
  width:300px;
  height:40px;
}

.field_name {
  width: 600px;
  margin-block: 10px;
}

.buttons{
  display: flex;
  margin-inline: auto;
  width: max-content;
}

.buttons *{
  margin-inline: 50px;
}

.left_side_text{
  height: max-content;
  width: 650px;
  margin-top: 10%;
  margin-left: 0%;
}

.left_side_text p{
  font-size: 100px;
  font-family: sans-serif;
  text-align: center;
  color: #2c3e50;
}

.left_side_text a{
  font-size: 20px;
  font-family: sans-serif;
  margin-left: 30px;
  color: #2c3e50;
}

</style>
