export default {
    props: ['msg', 'socketid', 'date'],

    template:
    `
    <article class="new-message animate__animated animate__bounce" :class="{ 'my-message' : matchedID }">
    <h4 >{{msg.message.name}} says:</h4>
    <p>{{msg.message.content}}</p>
    <p>{{msg.message.timestamp}}</p>
    <p>{{msg.message.date}}</p>
    </article>
    `,

    data: function() {
        return {
            matchedID: this.socketid == this.msg.id
        }
    }
}