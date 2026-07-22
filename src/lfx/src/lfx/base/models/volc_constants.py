"""Volcano Engine (火山方舟 Ark) model constants.

Ark offers an OpenAI-compatible endpoint at
https://ark.cn-beijing.volces.com/api/v3. Configure ``VOLC_API_KEY`` and
``VOLC_BASE_URL`` global variables to enable. The model identifier can be a
model name (below) or an Ark endpoint id (``ep-xxxxxxxx``) typed in the combobox.
"""

from .model_metadata import create_model_metadata

VOLC_MODELS_DETAILED = [
    # 豆包 Doubao 系列
    create_model_metadata(provider="Volcano Ark", name="doubao-1.5-pro-256k", icon="OpenAI", tool_calling=True),
    create_model_metadata(provider="Volcano Ark", name="doubao-1.5-pro-32k", icon="OpenAI", tool_calling=True),
    create_model_metadata(provider="Volcano Ark", name="doubao-pro-32k", icon="OpenAI", tool_calling=True),
    create_model_metadata(provider="Volcano Ark", name="doubao-pro-128k", icon="OpenAI", tool_calling=True),
    create_model_metadata(provider="Volcano Ark", name="doubao-lite-32k", icon="OpenAI", tool_calling=True),
    create_model_metadata(provider="Volcano Ark", name="doubao-lite-128k", icon="OpenAI", tool_calling=True),
    # DeepSeek 系列(火山方舟托管)
    create_model_metadata(provider="Volcano Ark", name="deepseek-v3-241226", icon="OpenAI", tool_calling=True),
    create_model_metadata(
        provider="Volcano Ark", name="deepseek-r1-250120", icon="OpenAI", tool_calling=True, reasoning=True
    ),
]
