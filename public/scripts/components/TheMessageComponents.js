export default {
    props: ['msg'],

    template:
    `
    <article>
    <h1>This is a message</h1>
    <h4>{{msg.message.name}} says:</h4>
    <p>{{msg.message.content}}</p>
    </article>
    `
}