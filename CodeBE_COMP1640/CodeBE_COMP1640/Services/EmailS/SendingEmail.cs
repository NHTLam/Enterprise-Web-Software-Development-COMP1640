using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CodeBE_COMP1640.Services.EmailS
{
    public interface IEmailSender
    {
        Task SendEmailAsync(List<string> recipients, string subject, string body);
    }
 
    public class EmailSender : IEmailSender
    {
    
       
       
        public async Task SendEmailAsync(List<string> recipients, string subject, string body)
        {       var _fromEmail = "nguyentuhai582@gmail.com";
                var _password = "abjz rgcc qtcw couj";
            
           
            using (var client = new SmtpClient("smtp.gmail.com", 587))
            {
                client.EnableSsl = true;
                client.Credentials = new NetworkCredential(_fromEmail, _password);

                foreach (var recipient in recipients)
                {
                    var mailMessage = new MailMessage();
                    mailMessage.From = new MailAddress(_fromEmail);
                    mailMessage.To.Add(recipient);
                    mailMessage.Subject = subject;
                    mailMessage.Body = body;

                    // Gửi email
                    await client.SendMailAsync(mailMessage);
                }
            }
        }
    }
    
    }

