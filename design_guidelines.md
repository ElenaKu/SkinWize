# Skincare Analysis App Design Guidelines

## Design Approach
**Reference-Based Approach** - Drawing inspiration from health and beauty apps like **Yuka, Think Dirty, and Sephora** that combine product scanning with educational content. The app requires a clean, trustworthy aesthetic that emphasizes ingredient transparency and scientific credibility.

## Core Design Principles
- **Trust and Credibility**: Professional medical/scientific aesthetic
- **Clarity over Complexity**: Clean ingredient presentation
- **Educational Focus**: Information hierarchy that teaches users
- **Gentle and Calming**: Skincare-appropriate color psychology

## Color Palette

### Primary Colors
- **Primary**: 160 25% 45% (Calming sage green - trust and nature)
- **Secondary**: 200 20% 25% (Deep blue-gray - scientific credibility)

### Supporting Colors
- **Background Light**: 160 15% 98% (Soft mint white)
- **Background Dark**: 200 15% 8% (Deep blue-black)
- **Success**: 145 60% 45% (Ingredient safety green)
- **Warning**: 35 85% 55% (Caution amber)
- **Error**: 0 70% 55% (Alert red)

### Accent Usage
Minimal accent colors - rely on primary green with subtle warm undertones (25 30% 85%) for highlights only when needed for CTAs.

## Typography
- **Primary**: Inter (clean, readable, scientific)
- **Headers**: Inter Bold/Semibold
- **Body**: Inter Regular
- **Ingredients/Scientific**: Inter Medium (enhanced readability)

## Layout System
**Tailwind Spacing**: Consistent use of 2, 4, 6, 8, 12, 16 units
- Base spacing: p-4, m-4
- Component separation: gap-6, space-y-8
- Large sections: py-12, px-6

## Component Library

### Core Components
- **Scan Interface**: Circular camera viewfinder with ingredient overlay capability
- **Product Cards**: Clean cards with ingredient safety scoring
- **Analysis Results**: Expandable ingredient lists with safety indicators
- **Routine Builder**: Timeline-style interface for morning/evening routines
- **Safety Indicators**: Color-coded badges (green/amber/red) with explanations

### Navigation
- **Bottom Tab Bar**: Scan, Products, Routine, Profile
- **Modal Overlays**: For detailed ingredient analysis
- **Slide-up Panels**: For scanning results and recommendations

### Forms
- **Skin Profile Setup**: Multi-step form with skin type/concerns selection
- **Search Interface**: Ingredient and product search with filters

### Data Displays
- **Ingredient Safety Cards**: Score, explanation, alternatives
- **Routine Timeline**: Visual morning/evening routine display
- **Compatibility Matrix**: Product interaction warnings

## Visual Treatments

### Gradients
- **Hero sections**: Subtle 160 25% 50% to 180 20% 60% (sage to soft blue-green)
- **Card overlays**: 160 15% 98% to 160 10% 95% (barely perceptible depth)
- **Background treatments**: Soft, barely noticeable gradients that don't compete with content

### Background Treatments
- **Primary backgrounds**: Clean whites and soft mint tones
- **Cards and surfaces**: Subtle shadows with scientific precision
- **Scan interface**: Dark overlay with clear circular cutout

## Images
- **Product photography**: High-contrast, clean product shots
- **Ingredient illustrations**: Simple, scientific-style molecular diagrams
- **Skin condition examples**: Clean, professional dermatological imagery
- **No large hero image**: Focus on functionality over marketing imagery

## Animations
**Minimal and Purposeful**:
- **Scan animation**: Gentle pulsing scan line
- **Loading states**: Subtle ingredient analysis progress
- **Results reveal**: Smooth slide-up reveal for analysis
- **Navigation**: Standard tab transitions only

## Key Design Considerations
- **Trust indicators**: Professional typography and clean layouts
- **Educational focus**: Clear information hierarchy
- **Ingredient transparency**: Easy-to-read safety information
- **Scanning experience**: Intuitive camera interface with clear feedback
- **Routine building**: Visual, timeline-based routine construction