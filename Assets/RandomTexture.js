#pragma strict

public var strResourcePath : String = "Tiles/Sprites/Foreground/Deep";

function Start () {
	this.renderer.material.mainTexture = GetTexture();
}

function Update () {

}

function GetTexture() : Texture
{
	var textures : Object[] = Resources.LoadAll(this.strResourcePath, Texture);
	Debug.Log("Textures: " + textures.Length);

    var texture : Texture = textures[Random.Range(0, textures.Length)];
	
	return texture;
}