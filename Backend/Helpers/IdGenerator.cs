using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace full_stack_chat_app_backend.Helpers
{
    public static class IdGenerator
    {
        public static string Generate(int length){
            Random random = new Random();
            var bytes = new Byte[length/2];
            random.NextBytes(bytes);    
            var hexArray = Array.ConvertAll(bytes, x => x.ToString("X2"));
            var hexStr = String.Concat(hexArray);
            return hexStr.ToLower();
        }
        
    }
    
}