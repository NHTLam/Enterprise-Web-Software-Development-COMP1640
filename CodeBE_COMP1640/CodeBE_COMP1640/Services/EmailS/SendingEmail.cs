using System.Net;
using System.Net.Mail;

namespace CodeBE_COMP1640.Services.EmailS
{
public interface IEmailSender{
    Task SendEmailAsync(String email,string subject,string message);
}
public class EmailSender : IEmailSender{
    public Task SendEmailAsync(String email,string subject,string message){
        var mail = "nguyentuhai582@gmail.com";
        var pw = "abjz rgcc qtcw couj";
        var client = new SmtpClient("smtp.gmail.com", 587){
            EnableSsl = true,
            Credentials = new NetworkCredential(mail, pw)
        };

        return client.SendMailAsync(
            new MailMessage(from: mail,
                                  to:  email,
                                   subject,
                                   message)
        );
    }
}
}