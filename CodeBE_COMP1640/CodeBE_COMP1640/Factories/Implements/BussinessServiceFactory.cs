using CodeBE_COMP1640.Factories.Interfaces;

namespace CodeBE_COMP1640.Factories.Implements
{
    public class BussinessServiceFactory : IBussinessServiceFactory
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IConfiguration _configuration;
        public BussinessServiceFactory(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }
    }
}
