using System.IO;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;

namespace IdentityServerWithAspNetIdentity
{
    static class Certificate
    {
        public static X509Certificate2 Get()
        {
            return new X509Certificate2(Path.Combine("Certificate", "idsrv3test.pfx"), "idsrv3test");
        }
    }
}