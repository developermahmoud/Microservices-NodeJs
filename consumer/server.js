import amqplib from "amqplib";
import dotenv from "dotenv";
import SendWelcomeEmail from "./emails/send_welcome_email.js";
dotenv.config();

/**
 * Receive Channel
 */
(async () => {
  const queue = "send-welcome-email";
  const conn = await amqplib.connect(process.env.QUEUE_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue(queue, {
    durable: false,
  });

  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const message = JSON.parse(msg.content.toString());
      new SendWelcomeEmail(message.email).send();
      channel.ack(msg);
    } else {
      console.log("Consumer cancelled by server");
    }
  });
})();
