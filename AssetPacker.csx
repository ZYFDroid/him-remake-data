using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

string inputDir = "himappdata";
string outputDir = "";
if(File.Exists("assetpath.txt")){
	outputDir = File.ReadAllText("assetpath.txt").Trim();
}
if(string.IsNullOrWhiteSpace(outputDir)){
	Console.WriteLine("Asset packing failed. target path is not specified. ");
	Console.WriteLine("Please create a 'assetpath.txt' file in the script directory.");
	Console.WriteLine("And write the project assets directory in the 'assetpath.txt' file");
	Console.WriteLine(@"e.g. Q:\Projects\Android\HimRemake\app\src\main\assets");
	Environment.Exit(-1);
	return;
}

if(!Directory.Exists(outputDir)){
	Console.WriteLine("Asset packing failed. target path does not exists. The path may be invalid. Check your 'assetpath.txt'");
	Environment.Exit(-1);
    return;
}

string manifest = "files.txt";
string datadir = "data";

string toRelativeDirStr(string path){
    string prefix = Path.GetFullPath(Environment.CurrentDirectory);
    if(!prefix.EndsWith(Path.DirectorySeparatorChar)){prefix += Path.DirectorySeparatorChar;}
    path = Path.GetFullPath(path);
    if(path.Length > prefix.Length){
        path = path.Substring(prefix.Length);
    }
    return path;
}

SHA1 sha1 = SHA1.Create();

string getHash(string file)
{
    string filetime = new FileInfo(file).LastWriteTime.ToString("yyyy\\-MM\\-dd HH\\:mm\\:ss\\.ffffff");
    string filename = file;
    string hashstr = filename + filetime;
    return Convert.ToHexString(sha1.ComputeHash(Encoding.UTF8.GetBytes(hashstr))).ToLower().Replace(" ", "").Replace("-", "").Replace(":", "");
}

void copyNoOverride(String src, String dest)
{
    if (File.Exists(dest)){
        return;
    }
    Console.WriteLine(toRelativeDirStr(src)+" => "+Path.GetFileName(dest));
    File.Copy(src, dest, true);
}

void rescueFiles(string rootPath, string currentPath, Action<string, string> action)
{
    Directory.EnumerateDirectories(currentPath).ToList().ForEach(f => { rescueFiles(rootPath, f, action); });
    Directory.EnumerateFiles(currentPath).ToList().ForEach(f =>
    {
        string absroot = Path.GetFullPath(rootPath);
        string absfile = Path.GetFullPath(f);
        if (!absroot.EndsWith("\\"))
        {
            absroot = absroot + "\\";
        }
        string relative = absfile.Substring(absroot.Length).Replace("\\", "/");
        action(relative, absfile);
    });

}


if (!Directory.Exists(outputDir))
{
    Directory.CreateDirectory(outputDir);
}
if (!Directory.Exists(Path.Combine(outputDir, datadir)))
{
    Directory.CreateDirectory(Path.Combine(outputDir, datadir));
}

List<string> fileLists = new List<string>();

List<string> tobeDeleted = new List<string>();
tobeDeleted.AddRange(Directory.EnumerateFiles(Path.Combine(outputDir, datadir)).Select(Path.GetFileName)!);

rescueFiles(inputDir, inputDir, (path, file) =>
{
    string hash = getHash(file) + Path.GetExtension(file);
    fileLists.Add(hash + " " + path);
    tobeDeleted.Remove(hash);
    copyNoOverride(file, Path.Combine(outputDir, datadir, hash));
    // Console.WriteLine(path);
});
File.WriteAllLines(Path.Combine(outputDir, manifest), fileLists.ToArray());

tobeDeleted.ForEach(f =>{
    var path = Path.Combine(outputDir, datadir,f);
    Console.WriteLine("Deleted: "+Path.GetFileName(path));
    File.Delete(path);
});

Console.WriteLine("Done");
if (Path.GetDirectoryName(Environment.ProcessPath) == Environment.CurrentDirectory)
{
    Console.WriteLine("按任意键继续");
    Console.ReadLine();
}
