using UnityEngine;
using System.Collections;

//Hack the prototype!
/*
public static class ExtensionMonoBehaviors
{
	public static void OnBecameVisible(this MonoBehaviour behavior)
	{
		Debug.Log ("thing happened");
		behavior.SendMessageUpwards("OnChildBecameVisible");
	}
}*/

public class Tiling : MonoBehaviour
{
	//delegate void Closure();

	[System.NonSerialized]
	public Tiling oLeft;
	
	[System.NonSerialized]
	public Tiling oRight;

	private Renderer childRenderer;
	
	public enum DEVIATION {
		NONE,
		DOWN,
		UP
	}
	
	public enum DIRECTION {
		LEFT,
		RIGHT
	}

	void Awake ()
	{
		/*
		Closure fnClosure;
		Tiling that = this;
		fnClosure = EnsureBuddies;
		*/
		childRenderer = this.GetComponentInChildren<Renderer> ();
		if (childRenderer.isVisible)
			EnsureBuddies ();
	}

	void Update()
	{
		if (childRenderer.isVisible)
			EnsureBuddies ();
	}

	protected void OnBecameVisible()
	{
		this.EnsureBuddies ();
	}
	
	protected void EnsureBuddies()
	{
		if (!oLeft)
		{
			oLeft = CreateBuddy( DIRECTION.LEFT );
		}
		
		if (!oRight)
		{
			oRight = CreateBuddy( DIRECTION.RIGHT );
		}
	}
	
	protected Tiling CreateBuddy ( DIRECTION cDirection)
	{
		Tiling oBuddy = Tiling.Instantiate(this, this.transform.position, this.transform.rotation) as Tiling;
		DEVIATION cDeviation = DEVIATION.NONE;
		
		if (Random.value < 0.1) 
		{
			if (Random.value < 0.5)
			{
				cDeviation = DEVIATION.DOWN;
			}
			else 
			{
				cDeviation = DEVIATION.UP;
			}
		}
		
		switch(cDirection) 
		{
			case DIRECTION.LEFT:
				oBuddy.transform.position -= new Vector3(childRenderer.bounds.size.x, 0);
				oBuddy.oRight = this;
				break;
			case DIRECTION.RIGHT:
				oBuddy.transform.position += new Vector3(childRenderer.bounds.size.x, 0);
				oBuddy.oLeft = this;
				break;
		}
		
		switch(cDeviation)
		{
			case DEVIATION.DOWN:
				oBuddy.transform.position -= new Vector3(0, childRenderer.bounds.size.y);
				break;
			case DEVIATION.UP:
				oBuddy.transform.position += new Vector3(0, childRenderer.bounds.size.y);
				break;
				
			default:
				break;
		}
		
		return oBuddy;
	}
	
}

