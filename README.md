# Sprite sheet svelte ts

This is a simple "npm module" that allows you to use sprite sheets in Svelte.  

## How to use "Sprite sheet svelte ts"
---


Module requires svelta and typescript.

Below is a sample configuration of the module

```svelte
<script lang="ts">
	import Animation from 'sprite-sheet-svelte-ts'
	import { writable } from 'svelte/store'

    import type { animationConfig } from 'sprite-sheet-svelte-ts/type'

    const config: animationConfig = {
	start: 'idle',

	fps: 10,
	oneFrameSize: {
		x: 64,
		y: 64,
	},

	imgSize: {
		column: 28,
		row: 11,
	},

	src: '/mage.png',

	animationList: {
		idle: {
			lineNumber: 0,
			length: 20,
			nextAnimation: ['idle', 'dying'], // <- if it's an array then the next animation will be the random animation from the array 
		},
		dying: {
			lineNumber: 1,
			length: 20,
			nextAnimation: 'idle',
		},
	},
}

	const isNextAnimation = writable<string | null>(null) // <- null means that the value entered in the config.animationList[name of current animation np. 'idle'].nextAnimation
</script>

<Animation config={config} isNextAnimation={test} />
```

### P.S.
---

This is my first "npm module" so I apologize for any errors or oversights. Please direct any corrections to my email: sgrzybbowski@gmail.com