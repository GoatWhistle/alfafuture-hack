from features.llm.system_prompt import SYSTEM_PROMPT


def estimate_tokens(text: str) -> int:
    return max(1, int(len(text) / 4))


def build_dynamic_context(messages, max_tokens: int = 120000) -> str:
    used = estimate_tokens(SYSTEM_PROMPT)
    selected = []

    for msg in reversed(messages):
        prefix = "User" if msg.sender == "USER" else "Assistant"
        line = f"{prefix}: {msg.content}"

        tokens = estimate_tokens(line)

        if used + tokens > max_tokens:
            break

        selected.append(line)
        used += tokens

    selected.reverse()

    full_prompt = SYSTEM_PROMPT.strip() + "\n\n" + "\n".join(selected)
    return full_prompt
