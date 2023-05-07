import amqplib from "amqplib";

export default class RegisterEmailJob {
  constructor(email) {
    this.email = email;
    this.subject = "Welcome Email";
  }

  async queue() {
    const queue = "send-welcome-email";
    const conn = await amqplib.connect(process.env.QUEUE_URL);
    const channel = await conn.createChannel();
    await channel.assertQueue(queue, {
      durable: false,
    });
    await channel.sendToQueue(
      queue,
      Buffer.from(
        JSON.stringify({
          email: this.email,
          subject: "Welcome Email",
        })
      )
    );
  }
}
