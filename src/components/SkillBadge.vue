<template>
  <span :class="badgeClasses">
    <span v-if="icon" class="mr-2">{{ icon }}</span>
    {{ skill }}
  </span>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'SkillBadge',
  props: {
    skill: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value),
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'success', 'warning', 'info'].includes(value),
    },
  },
  setup(props) {
    const sizeClasses = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
      lg: 'px-4 py-2 text-base',
    }

    const variantClasses = {
      primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400',
      secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      success: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    }

    const badgeClasses = computed(() => [
      'inline-flex items-center font-medium rounded-full',
      sizeClasses[props.size],
      variantClasses[props.variant],
    ])

    // Icônes pour certaines compétences
    const skillIcons = {
      'Vue.js': '🖖',
      'JavaScript': '⚡',
      'TypeScript': '🔷',
      'React': '⚛️',
      'Node.js': '🟢',
      'Python': '🐍',
      'PHP': '🐘',
      'HTML': '🌐',
      'CSS': '🎨',
      'SCSS': '💅',
      'Tailwind': '🌊',
      'Bootstrap': '🅱️',
      'MySQL': '🐬',
      'PostgreSQL': '🐘',
      'MongoDB': '🍃',
      'Redis': '🔴',
      'Docker': '🐳',
      'AWS': '☁️',
      'Git': '📝',
      'GitHub': '🐙',
      'SEO': '📈',
      'Google Ads': '📢',
      'Analytics': '📊',
      'Figma': '🎨',
      'Photoshop': '🖼️',
      'WordPress': '📝',
    }

    const icon = computed(() => skillIcons[props.skill] || null)

    return {
      badgeClasses,
      icon,
    }
  },
}
</script>
