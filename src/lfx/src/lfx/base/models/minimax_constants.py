"""MiniMax model constants.

MiniMax offers an OpenAI-compatible endpoint at
https://api.minimaxi.com/v1 (domestic) or https://api.minimax.io/v1 (global).
Configure ``MINIMAX_API_KEY`` and ``MINIMAX_BASE_URL`` global variables to enable.
"""

from .model_metadata import create_model_metadata

MINIMAX_MODELS_DETAILED = [
    create_model_metadata(provider="MiniMax", name="MiniMax-M3", icon="MiniMax", tool_calling=True),
    create_model_metadata(provider="MiniMax", name="MiniMax-M2.5", icon="MiniMax", tool_calling=True),
    create_model_metadata(provider="MiniMax", name="MiniMax-M2.5-highspeed", icon="MiniMax", tool_calling=True),
    create_model_metadata(provider="MiniMax", name="MiniMax-M2.7", icon="MiniMax", tool_calling=True),
    create_model_metadata(provider="MiniMax", name="MiniMax-Text-01", icon="MiniMax", tool_calling=True),
    create_model_metadata(provider="MiniMax", name="abab6.5s-chat", icon="MiniMax", tool_calling=True),
    create_model_metadata(provider="MiniMax", name="abab6.5-chat", icon="MiniMax", tool_calling=True),
]
