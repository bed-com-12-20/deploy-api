import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { CafeA } from './CafeA';
import { CafeB } from './CAfeB';
import { google } from 'googleapis';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => CafeA, cafeA => cafeA.user)
  cafeAs: CafeA[];
  
  @OneToMany(() => CafeB, cafeB => cafeB.user)
  cafeBs: CafeB[];
  

@BeforeInsert()
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
      const subject = 'Welcome to Multiplug restraunt';
      const message='thank you for creating account at multiplug restraunt your  username is '+this.username+''+'your password is:'+this.password+'please keep it safe dont tell anyone';
  
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
  
 


