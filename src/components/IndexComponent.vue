<template>
    <div>
        <navbar />

        <h1>Posts</h1>
        
        <router-link :to="{ name: 'create' }" class="btn btn-primary">Create Post</router-link> 

        <table class="table table-hover mt-4">
            <thead>
            <tr>
                <th>Title</th>
                <th>Body</th>
                <th colspan="2">Actions</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts" :key="post._id">
                    <td>{{ post.title }}</td>
                    <td>{{ post.body }}</td>
                    <td><router-link :to="{name: 'edit', params: { id: post._id }}" class="btn btn-primary">Edit</router-link></td>
                    <td><button class="btn btn-danger" @click="deletePost(post._id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {

    data() {
        return {
            posts: []
        }
    },

    created() {

        let uri = 'http://localhost:4000/posts';

        this.axios.get(uri).then(response => {
            this.posts = response.data;
        });

    },

    methods: {
        
        deletePost(id) {

            let uri = `http://localhost:4000/posts/delete/${id}`;
            this.axios.delete(uri).then(() => {
                this.posts.splice(this.posts.indexOf(id), 1);
            });

        }
    }

}

</script>