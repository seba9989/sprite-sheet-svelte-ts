<script lang="ts">
	import { onMount } from 'svelte'
	import type { animationConfig, animationObject } from './AnimationTypes'
	import type { Writable } from 'svelte/store'

	// Html elements
	let canvas: HTMLCanvasElement
	let ctx: CanvasRenderingContext2D | undefined
	let img: HTMLImageElement

	// Start value
	export let config: animationConfig

	let animationList = config.animationList

	const oneFrameWidth = config.oneFrameSize.x
	const oneFrameHeight = config.oneFrameSize.y

	export let width: number = oneFrameWidth
	export let height: number = oneFrameHeight

	export let fps: number = config.fps

	// Current value
	let currentAnimation: animationObject = animationList[config.start]
	let currentFrame: number = 0

	export let nextAnimation: Writable<string | null>

	// Function
	function GetRandomInt(max: number) {
		return Math.floor(Math.random() * max)
	}

	function ClearCanvas() {
		ctx?.clearRect(0, 0, oneFrameWidth, oneFrameHeight)
	}

	function IfAnimationEnd() {
		if (currentFrame === currentAnimation?.length - 1) {
			if ($nextAnimation !== null) {
				currentAnimation = animationList[$nextAnimation]
				nextAnimation.set(null)
			} else {
				const nextAnimation = currentAnimation.nextAnimation

				if (typeof nextAnimation === 'string') {
					currentAnimation = animationList[nextAnimation]
				} else {
					currentAnimation = animationList[nextAnimation[GetRandomInt(nextAnimation.length)]]
				}
			}

			currentFrame = 0
		}
	}

	// Start
	onMount(() => {
		canvas.width = oneFrameWidth
		canvas.height = oneFrameHeight

		const c: CanvasRenderingContext2D | null = canvas.getContext('2d')

		if (c) {
			ctx = c
		}
	})

	// Update
	$: setTimeout(() => {
		ClearCanvas()

		IfAnimationEnd()

		currentFrame++
	}, 1000 / fps)

	$: ctx?.drawImage(
		img,
		-oneFrameWidth * currentFrame,
		-oneFrameHeight * currentAnimation.lineNumber,

		oneFrameWidth * config.imgSize.column,
		oneFrameHeight * config.imgSize.row
	)
</script>

<img src={config.src} alt="" bind:this={img} />

<canvas bind:this={canvas} style="width: {width}px; height: {height}px;" />

<style>
	canvas {
		image-rendering: crisp-edges;
	}

	img {
		display: none;
	}
</style>
