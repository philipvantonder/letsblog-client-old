<template>
    <div class="container w-25 shadow p-3 mt-5 rounded">

        <h2> Lets Blog </h2>

        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1">
            </div>

            <div class="d-flex justify-content-between">
                <button class="btn btn-outline-dark">Login</button>
                <router-link :to="{ name: 'register' }" class="btn btn-outline-dark">Register</router-link>
            </div>
        </form>
    </div>
</template>