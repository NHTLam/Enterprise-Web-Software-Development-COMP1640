using System.Net.Mail;
namespace CodeBE_COMP1640.Services.EmailS{
public interface IEmailService
    {
        Task SendEmailAsync(string toEmail, string subject, string content);
    }

    public class EmailService : IEmailService
    {
        private readonly string _smtpHost;
        private readonly int _smtpPort;
        private readonly string _smtpUsername;
        private readonly string _smtpPassword;

        public EmailService(string smtpHost, int smtpPort, string smtpUsername, string smtpPassword)
        {
            _smtpHost = smtpHost;
            _smtpPort = smtpPort;
            _smtpUsername = smtpUsername;
            _smtpPassword = smtpPassword;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string content)
        {
            using (var message = new MailMessage())
            {
                message.To.Add(toEmail);
                message.Subject = subject;
                message.Body = content;
                message.IsBodyHtml = true; // Đặt thành true nếu nội dung email là HTML

                using (var smtpClient = new SmtpClient(_smtpHost, _smtpPort))
                {
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Credentials = new System.Net.NetworkCredential(_smtpUsername, _smtpPassword);
                    smtpClient.EnableSsl = true; // Đặt thành true nếu sử dụng SSL

                    await smtpClient.SendMailAsync(message);
                }
            }
        }
    }

}

