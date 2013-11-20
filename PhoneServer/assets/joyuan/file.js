//���ù���Ŀ¼
var MyDir = "mnt/sdcard/";
var MyFile="";
function delfile(s){ //ɾ���ļ�����
 var fso=new ActiveXObject("Scripting.FileSystemObject");
 var rfile=s;
 rfile=rfile.replace(/\\/g,"\\\\");
 var mdir=getPath(rfile);
 try{
  fso.DeleteFile(unescape(rfile));
  alert("ɾ���ļ��ɹ�");
 }catch(e){
  alert("ɾ���ļ�ʧ��");
 }
 readDirs(mdir);
}
function deldir(s){ //ɾ��Ŀ¼����
 var fso=new ActiveXObject("Scripting.FileSystemObject");
 var rfile=unescape(s);
 rfile=rfile.replace(/\\/g,"\\\\");
 var mdir=getPath(rfile);
 try{
  fso.deleteFolder(rfile);
  alert("ɾ��Ŀ¼�ɹ�");
 }catch(e){
  alert("ɾ��Ŀ¼ʧ��");
 }
 readDirs(mdir);
}
function renameDir(s,n){ //������Ŀ¼����
 var newname=prompt("������: \n �����������,JavaScript��Ϊ�������",n);
 var mdir="";
 if(newname!=""&&newname!=null){
  var fso=new ActiveXObject("Scripting.FileSystemObject");
  var rfile=unescape(s);
  rfile=rfile.replace(/\\/g,"/");
  var Folder=fso.getFolder(rfile);
  newname=mdir+newname;
  newname=newname.replace(/\\/g,"/");
  try{
   Folder.Name=newname;
   alert("������Ŀ¼�ɹ�");
  }catch(e){
   alert("������Ŀ¼ʧ��");
  }
  mdir=document.getElementById('showpath').innerHTML;
  readDirs(mdir);
 }
}
function renameFile(s,n){ //�������ļ�����
 var newname=prompt("������: \n �����������,JavaScript��Ϊ�������",n);
 var mdir="";
 if(newname!=""&&newname!=null){
  var fso=new ActiveXObject("Scripting.FileSystemObject");
  var rfile=s;
  rfile=rfile.replace(/\\/g,"/");
  var Folder=fso.getFile(rfile);
  newname=mdir+unescape(newname);
  newname=newname.replace(/\\/g,"/");
  try{
   Folder.Name=newname;
   alert("�������ļ��ɹ�");
  }catch(e){
   alert("�������ļ�ʧ��");
  }
  mdir=document.getElementById('showpath').innerHTML;
  readDirs(mdir);
 }
}
function newDir(){ //����Ŀ¼����
 var newname=prompt("�����������,JavaScript������Ŀ¼","newname");
 if(newname!=""&&newname!=null){
  var mpath=document.getElementById('showpath').innerHTML;
  mpath=mpath.replace(/\//g,"\\");
  newname=mpath+"\\"+unescape(newname);
  newname=newname.replace(/\\\\/g,"\\");
  var mdir=getPath(newname);
  fso=new ActiveXObject("Scripting.FileSystemObject");
  try{
   fso.CreateFolder(newname);
   alert("����Ŀ¼�ɹ�");
  }catch(e){
   alert("����Ŀ¼ʧ��");
  }
  readDirs(mdir);
 }
}
function newFile(){ //�����ļ�����
 var newname=prompt("�����������,JavaScript�������ļ�","newname.txt");
 if(newname!=""&&newname!=null){
  var mpath=document.getElementById('showpath').innerHTML;
  mpath=mpath.replace(/\//g,"\\");
  newname=mpath+"\\"+unescape(newname);
  newname=newname.replace(/\\\\/g,"\\");
  var mdir=getPath(newname);
  fso=new ActiveXObject("Scripting.FileSystemObject");
  try{
   f1=fso.CreateTextFile(newname,true);
   try{
    f1.WriteLine(document.getElementById('filecontent').value);
    
   }catch(e){
    f1.WriteLine("JavaScript Hello World!");
   }
   f1.WriteBlankLines(1);
   document.getElementById('marea').style.zIndex=1;
   f1.Close();
   alert("�����ļ��ɹ�");
  }catch(e){
   alert("�����ļ�ʧ��");
  }
  readDirs(mdir);
 }
}
function readDirs(path){ //��ȡ�ļ�Ŀ¼�б�
 var fso=new ActiveXObject("Scripting.FileSystemObject");
 var f=fso.GetFolder(path);
 var fc=new Enumerator(f.files);
 var r=/\\/g;
 var rfile="";
 var rpath="";
 var mpath=path;
 MyFile="";
 if(path==this.MyDir){
  path=this.MyDir;
  path=path.replace(r,"\\\\");
 }else{
  path=getpDir(path);
 }
 document.getElementById('showdir').innerHTML="";
 this.MyFile+="<table width=\"100%\" border=1 cellSpacing=1 cellPadding=3>\
  <tr><th width=\"50\"><a href=\"#\" onClick=\"readDirs('"+path+"')\" title=\"��һ��\">��һ��</a></th>\
  <th width=\"*\">���[<a href=\"#\" onClick=\"CreateFile();\">�½��ļ�</a>][<a href=\"#\" onClick=\"newDir();\">�½�Ŀ¼</a>]</th>\
  <th width=\"110\">����</th>\
  </tr>";
 fk=new Enumerator(f.SubFolders);
 for(;!fk.atEnd();fk.moveNext()){
  rpath=fk.item();
  rpath=unescape(rpath);
  rpath=rpath.replace(r,"\\\\");
  var fkpath=getFile(unescape(fk.item()));
  this.MyFile+="<tr><td>DIR</td>\
   <td><a href=\"#\" onClick=\"readDirs('"+rpath+"');\">"+fkpath+"</a></td>\
   <td><a href=\"#\" onClick=\"return confirm('ȷ��Ҫɾ����?');deldir('"+rpath+"');\">ɾ��</a>|\
   <a href=\"#\" onClick=\"renameDir('"+rpath+"','"+fkpath+"');\">������</a>|\
   <a href=\"#\" onClick=\"readDirs('"+rpath+"');\">���</a>\
   </td></tr>";
 }
 for(;!fc.atEnd();fc.moveNext()){
  if(switchFile(unescape(fc.item()))){
   rfile=fc.item();
   rfile=unescape(rfile);
   rfile=rfile.replace(r,"\\\\");
   var fcpath=getFile(unescape(fc.item()));
   this.MyFile+="<tr><td>File</td>\
    <td><a href=\"#\" onClick=\"readfiles('"+rfile+"');\">"+fcpath+"</a></td>\
    <td><a href=\"#\" onClick=\"return confirm('ȷ��Ҫɾ����?');delfile('"+rfile+"');\">ɾ��</a>|\
    <a href=\"#\" onClick=\"readfiles('"+rfile+"');\">�༭</a>|\
    <a href=\"#\" onClick=\"renameFile('"+rfile+"','"+fcpath+"');\">������</a>\
    </td></tr>";
  }
 }
 this.MyFile+="</table>";
 path=path.replace(/\\\\/g,"\\");
 document.getElementById('showdir').innerHTML=MyFile;
 document.getElementById("showpath").innerHTML=mpath;
}
function switchFile(url){ //��ȡ��ǰ�ļ�����
 switch(getFileName(url,".")){
  case "exe":return false;break;
  case "rar":return false;break;
  case "zip":return false;break;
  case "chm":return false;break;
  case "jpg":return false;break;
  case "gif":return false;break;
  case "bmp":return false;break;
  case "box":return false;break;
  case "winerr":return false;break;
  default:return true;break;
 }
}
function getFile(url){ //��ȡ��ǰ�ļ���
 var url=url.split("\\");
 var pos=url.length;
 return url[pos-1];
}
function getFileName(url,s){ //��ȡ��ǰ�ļ����ͺ��ļ���
 //alert(url);
 var url=url;
 var pos=url.lastIndexOf("\\");
 if((url.substr(pos+1)).lastIndexOf(".")==-1){
  return "winerr";
 }
 if(pos!=-1)pos=url.lastIndexOf(s)
 var filename=url.substr(pos+1)
 return filename;
}
function getExt(s){ //�ж��ļ���ʽ����ûʹ��
 var r,re;
 var s=unescape(s);
 re=/\.([^\.]+)$/i;
 r=s.match(re);
 return r[1];
}
function getpDir(s){ //��ȡ��Ŀ¼����
 var r,re;
 var s=unescape(s);
 var pdir="";
 re=/\\/g;
 r=s.split(re);
 for(i=0;i<r.length-1;i++){ 
  pdir+=r[i]+"\\\\";
 }
 return pdir;
}
function getPath(s){ //��ʽ��·��
 var r,re;
 var s=unescape(s);
 var pdir="";
 re=/\\/g;
 r=s.split(re);
 for(i=0;i<r.length-1;i++){
  pdir+=r[i]+"\\";
 }
 return pdir;
}
function CreateFile(){ //��ʾ�ļ��༭��
 document.getElementById('marea').style.zIndex=10;
}
function OffFile(){ //�ر�Ŀ¼�༭��
 document.getElementById('marea').style.zIndex=1;
 document.getElementById('marea1').style.zIndex=2;
}
function readfiles(s){ //��ȡ�ļ��༩
 var ForReading=1;
 var getFile;
 var message;
 var fso="";
 var ts="";
 var str="";
 fso=new ActiveXObject("Scripting.FileSystemObject");
 var ms=fso.GetFile(s);
 ts=fso.OpenTextFile(s,ForReading);
 message="[FileName:"+ms.Name+"][Filesize:"+ms.size+" bytes]";
 str=ts.ReadAll();
 document.getElementById('marea1').style.zIndex=10;
 document.getElementById('fmessage').innerHTML=message;
 document.getElementById('filecontent1').value=unescape(str);
 document.getElementById('mpath').value=unescape(s);
}
function writefiles(){ //д���ļ�
 var ts="";
 var s=document.getElementById('mpath').value;
 s=s.replace(/\\/g,"\\\\");
 fso=new ActiveXObject("Scripting.FileSystemObject");
 ForAppending=2;
 try{
  ts=fso.OpenTextFile(unescape(s),ForAppending,false);
  ts.WriteLine(unescape(document.getElementById('filecontent1').value));
  document.getElementById('marea1').style.zIndex=2;
  alert("����ļ��ɹ�");
  ts.close();
 }catch(e){
  alert("����ļ�ʧ��");
 }
}