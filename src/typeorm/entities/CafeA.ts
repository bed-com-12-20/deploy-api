import { Entity, PrimaryGeneratedColumn, Column, AfterInsert, ManyToOne, JoinColumn } from 'typeorm';


import { google } from 'googleapis';
import { User } from './User';

@Entity({ name: 'cafeB' })
export class CafeA {
  @PrimaryGeneratedColumn()
  orderid: number;

  @Column()
  foodType: string;

  @Column()
  phonenumber: string;

  @Column()
  location: string;

  @Column()
  paymentmethod: string;

  @Column({ nullable: true })
  email: string|null ;

  @Column({ default: new Date() })
  orderedAt: Date;

  @ManyToOne(() => User, user => user.cafeBs)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })

  user: User;

 

  @AfterInsert()
  async sendNotification() {
    try {
      // Configure your Gmail API credentials
      const credentials = {
        client_id: '945057323641-9398cr0bfvkj5a0arnjq539ermva23ou.apps.googleusercontent.com',
        client_secret: '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',
        redirect_uris: ['http://localhost:3000/cafeBorders','https://localhost:3000/cafeAorders','http://localhost:3000/users'],
        refresh_token: '1//xEoDL4iW3cxlI7yDbSRFYNG01kVKM2C-259HOF2aQbI',
      };

      const oauth2Client = new google.auth.OAuth2(
        credentials.client_id,
        credentials.client_secret,
        credentials.redirect_uris[3]
      );

      oauth2Client.setCredentials({ refresh_token: credentials.refresh_token });

      const gmail = google.gmail({
        version: 'v1',
        auth: oauth2Client,
      });

      const mailOptions = {
        requestBody: {
          raw: this.createMessage(),
        },
        userId: 'me',
      };

      await gmail.users.messages.send(mailOptions);
      console.log('Notification email sent successfully.');
    } catch (error) {
      console.error('Error sending notification email:', error);
    }
  }
  private createMessage(){
    const subject = 'New Order Notification';
    const message='Food:'+this.foodType+''+'location:'+this.location+''+'orderid:'+this.orderid+''+'orderDate:'+
    this.orderedAt+''+'phone number:'+this.phonenumber+'paymemt method:'+this.paymentmethod+''+'your order has been placed successfully';
    

    const emailLines = [
      `From: ${'patsondamascus@gmail.com'}`,
      `To: ${this.email || ''}`,
      'Content-Type: text/html;charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${subject}`,
      '',
      `${message}`,
    ];

    const email = emailLines.join('\r\n').trim();
    const encodedEmail = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');

    return encodedEmail;
  }
}
