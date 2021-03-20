# Angular-11 based CRUD (Create, Read, Update, Delete) User Management

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

<h1>Installation</h1>
<ul> 
    <li>
        <p>1. Pull source code from github.</p>
        <pre>https://github.com/ArunMeghanathan97/UserManagement-Angular-11.git</pre>
    </li>
    <li>
        <p> 2. Preparing database. We need to prepare default database for the first time use. At backend folder, run: </p>
        <pre>npm install</pre>
    </li>
    <li>
        <p>3. Set the application key for back-end. At backend folder, run:</p>
        <pre>ng serve</pre>
    </li>
</ul>


<h1>Usage</h1>
<p>You also can directly access back-end API via Restful webservice as below:</p>
<code>
<table>
    <tr>
        <th> Method </th>
        <th> API </th>
        <th> Parameters </th>
        <th> Action </th>
    </tr>
    <tr>
        <td>POST</td>
        <td>list</td>
        <td>page and search params (name , email , mobile ,state , dob) </td>
        <td> get user list  </td>
    </tr>
    <tr>
        <td>GET</td>
        <td>list</td>
        <td>page and search params (name , email , mobile ,state , dob)</td>
        <td> export user list </td>
    </tr>
    <tr>
        <td>POST</td>
        <td>add</td>
        <td>name, username, email, mobile, profile_img, dob, address, city, state, country</td>
        <td>add new user</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>edit</td>
        <td>name, username, email, mobile, profile_img, dob, address, city, state, country</td>
        <td>update user details</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>delete</td>
        <td>id</td>
        <td>delete user details</td>
    </tr>
    <tr>
        <td>POST</td>
        <td>detail</td>
        <td>id</td>
        <td>view user details</td>
    </tr>
</table>
</code>

<p> <b>Arunkumar</b> - full stack software engineer</p>
<p>arunmeghaform@gmail.com</p>
