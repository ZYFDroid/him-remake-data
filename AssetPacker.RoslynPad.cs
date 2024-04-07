using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AssetPacker
{
    internal class Program
    {
        const string inputDir = "himappdata";
        const string outputDir = "assets";
        const string manifest = "files.txt";
        const string datadir = "data";
        static void Main(string[] args)
        {

            if (!Directory.Exists(outputDir))
            {
                Directory.CreateDirectory(outputDir);
            }
            if (!Directory.Exists(Path.Combine(outputDir,datadir)))
            {
                Directory.CreateDirectory(Path.Combine(outputDir, datadir));
            }

            List<string> fileLists = new List<string>();

            rescueFiles(inputDir, inputDir, (path, file) =>
            {
                string hash = getHash(file)+Path.GetExtension(file);
                fileLists.Add(hash+" "+path);
                copyNoOverride(file, Path.Combine(outputDir,datadir,hash));
                Console.WriteLine(path);
            });
            File.WriteAllLines(Path.Combine(outputDir,manifest), fileLists.ToArray());
            Console.WriteLine("Done");
            //Console.ReadLine();



        }

        private static void copyNoOverride(String src,String dest)
        {
            if (!File.Exists(dest))
            {
                File.Copy(src, dest);
            }
        }

        private static void rescueFiles(string rootPath,string currentPath,Action<string,string> action)
        {
            Directory.EnumerateDirectories(currentPath).ToList().ForEach(f => { rescueFiles(rootPath, f, action); });
            Directory.EnumerateFiles(currentPath).ToList().ForEach(f => { 
                string absroot = Path.GetFullPath(rootPath);   
                string absfile = Path.GetFullPath(f);
                if(!absroot.EndsWith("\\")) {
                    absroot = absroot + "\\";
                }
                string relative = absfile.Substring(absroot.Length).Replace("\\","/");
                action(relative, absfile);
            });

        }


        private static int i = 0;
        private static object s = new object();
        public static string getHash(string file)
        {
            lock (s)
            {
                return (i++).ToString("00000");
            }
        }
    }
}
